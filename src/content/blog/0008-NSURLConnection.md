---
kind: article
created_at: 2010-11-21
title: Adding state to NSURLConnection
---

Here's a quick and simple way of adding state to NSURLConnection objects.

If you've ever written Cocoa code to talk to a remote HTTP server, you've 
probably used `NSURLConnection`. The basic use case looks something like this.
First you instantiate an NSURLConnection using an NSURLRequest object:

    NSURLConnection* conn = [[NSURLConnection alloc] initWithRequest:someRequest delegate:self];
    [conn release];

Then elsewhere you write delegate methods to handle callbacks from the connection such as 
`connection:didReceiveData:` when the delegate receives data from the connection, 
`connectionDidFinishLoading:` when the connection has finished loading, or 
`connection:didFailWithError:` if it fails.

The tricky thing there is: if I instantiate more than one NSURLConnection object, how do I know
which connection the delegate methods are being called for? (If you're telling yourself it's OK,
my code doesn't instantiate more than one NSURLConnection object at a time, ask yourself: can I
**guarantee** that my code will **never** have more than one NSURLConnection live at any one time? If you 
can't, read on...)

Here's what I'd like to be able to do in `connection:didReceiveData:`, for example:

    -(void) connection:(NSURLConnection*)connection didReceiveData:(NSData*)data {
        // buffers is an NSDictionary of previously instantiated NSMutableData
        // objects, one per connection
        NSMutableData *buffer = [buffers objectForKey:[connection uniqueId]];
        [buffer appendData:data];
    }
    
But sadly, the `uniqueId` method on NSURLConnection doesn't exist, and there isn't any other
similar functionality available in NSURLConnection. 

So I decided to solve the problem by adding an instance variable to NSURLConnection. You
can add methods to existing classes using categories, but to add an instance variable you
need to subclass. Here's all you need to do:

    @interface GSURLConnection : NSURLConnection {
    	NSDictionary *userInfo;
    }

    @property (nonatomic, retain) NSDictionary *userInfo;

    @end

    @implementation GSURLConnection

    @synthesize userInfo;

    @end
    
This gives you an instance variable `userInfo` that you can use to store all sorts of 
additional state in a key/value stylee. Then when you create a connection, use this:

    GSURLConnection *conn = [[GSURLConnection alloc] initWithRequest:req 
                                                            delegate:self 
                                                    startImmediately:NO];

    NSString *uniqueId = myUniqueIdGenerator();
    NSDictionary *userInfo = [NSDictionary dictionaryWithObjectsAndKeys:
                              uniqueId,
                              @"uniqueId",
                              nil];
    
    // Create an empty data buffer for this connection
    [buffers setObject:[NSMutableData dataWithCapacity:256]
                forKey:uniqueId];

    conn.userInfo = userInfo;
    [conn scheduleInRunLoop:[NSRunLoop mainRunLoop] forMode:NSDefaultRunLoopMode];
    [conn start];
    [conn release];

Then in your delegate methods, you do stuff like this:

    - (void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data {
        NSString *key = [((GSURLConnection*)connection).userInfo objectForKey:@"uniqueId"];
    	[[buffers objectForKey:key] appendData:data];    
    }


    - (void)connectionDidFinishLoading:(NSURLConnection *)connection {
        NSString *key = [((GSURLConnection*)connection).userInfo objectForKey:@"uniqueId"];
        NSData *rawData = [buffers objectForKey:key];
        [buffers removeObjectForKey:key];
        
        // do stuff with rawData
    }

Simple!

I'm sure there are loads of ways to improve this - if you know one, add a comment!
