//
//  KeyaddrManager.m
//  ndauwalletrn
//
//  Created by Kristofer Pelchat on 7/8/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "KeyaddrManager.h"
#import <React/RCTLog.h>
#import <Keyaddr/Keyaddr.h>

@implementation KeyaddrManager

// To export a module named CalendarManager
RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(KeyaddrWordsFromBytes,lang:(NSString*)lang bytes:(NSData*)bytes KeyaddrWordsFromBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"KeyaddrWordsFromBytes call with %@ at %@", lang, bytes);
  NSError *__autoreleasing *error;
  
  NSString *words = KeyaddrWordsFromBytes(lang, bytes, error);
  if (error) {
    reject(@"no_events", @"Issue calling KeyaddrWordsFromBytes", *error);
  } else {
    resolve(words);
  }
}

@end
