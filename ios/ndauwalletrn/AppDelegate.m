/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import "RCCManager.h"
#import <React/RCTRootView.h>
#import <Keyaddr/Keyaddr.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.backgroundColor = [UIColor whiteColor];
  [[RCCManager sharedInstance] initBridgeWithBundleURL:jsCodeLocation launchOptions:launchOptions];
  
  NSString *str = @"helowrld";
  // This converts the string to an NSData object
  NSData *data = [str dataUsingEncoding:NSUTF8StringEncoding];
  NSError *__autoreleasing *error;
  NSString *words = KeyaddrWordsFromBytes(@"en", data, error);
  NSLog(@"HERE THEY ARE!!! %@", words);
  
  //Send all the fonts to the console window for debugging purposes
//  for (NSString* family in [UIFont familyNames])
//  {
//    NSLog(@"%@", family);
//
//    for (NSString* name in [UIFont fontNamesForFamilyName: family])
//    {
//      NSLog(@"  %@", name);
//    }
//  }
  
  return YES;
}

@end
