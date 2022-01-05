#import <Foundation/Foundation.h>
#import "IOSNativeHelper.h"

@implementation IOSNativeHelper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(exitApp)
{
    exit(0);
}

@end
