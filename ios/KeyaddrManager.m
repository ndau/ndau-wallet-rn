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

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(KeyaddrWordsFromBytes,lang:(NSString*)lang bytes:(NSData*)bytes KeyaddrWordsFromBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"KeyaddrWordsFromBytes call with %@ at %@", lang, bytes);
  NSError *__autoreleasing *error = NULL;
  
  NSString *words = KeyaddrWordsFromBytes(lang, bytes, error);
  if (error) {
    reject(@"no_events", @"Issue calling KeyaddrWordsFromBytes", *error);
  } else {
    resolve(words);
  }
}

RCT_REMAP_METHOD(CreatePrivateKey,seed:(NSData*)seed neuterithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"CreatePrivateKey call on %@", seed);
  NSError *__autoreleasing *error = NULL;
  
  KeyaddrKey *keyAddrKey = [[KeyaddrKey alloc] init:(seed)];
  NSString* privateKey = [keyAddrKey key];
  
  if (error) {
    reject(@"no_events", @"Issue calling CreatePrivateKey", *error);
  } else {
    resolve(privateKey);
  }
}

@end
