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

RCT_REMAP_METHOD(KeyaddrWordsFromBytes,lang:(NSString*)lang bytes:(NSString*)bytes KeyaddrWordsFromBytesWithResolver:(RCTPromiseResolveBlock)resolve
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

RCT_REMAP_METHOD(KeyaddrWordsToBytes,lang:(NSString*)lang words:(NSString*)words KeyaddrWordsToBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"KeyaddrWordsToBytes call with lang:%@ and words:%@", lang, words);
  NSError *__autoreleasing *error = NULL;
  
  NSString *bytes = KeyaddrWordsToBytes(lang, words, error);
  if (error) {
    reject(@"no_events", @"Issue calling KeyaddrWordsToBytes", *error);
  } else {
    RCTLogInfo(@"KeyaddrWordsToBytes converted words above to:%@", bytes);
    resolve(bytes);
  }
}

RCT_REMAP_METHOD(CreatePrivateKey,seed:(NSString*)seed neuterithResolver:(RCTPromiseResolveBlock)resolve
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
