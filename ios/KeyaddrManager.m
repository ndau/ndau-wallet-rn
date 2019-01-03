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

RCT_REMAP_METHOD(keyaddrWordsFromBytes,lang:(NSString*)lang bytes:(NSString*)bytes keyaddrWordsFromBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"keyaddrWordsFromBytes call with %@ at %@", lang, bytes);
  NSError *__autoreleasing *error = NULL;

  NSString *words = KeyaddrWordsFromBytes(lang, bytes, error);
  if (error) {
    reject(@"no_events", @"Issue calling keyaddrWordsFromBytes", *error);
  } else {
    resolve(words);
  }
}

RCT_REMAP_METHOD(keyaddrWordsToBytes,lang:(NSString*)lang words:(NSString*)words keyaddrWordsToBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"keyaddrWordsToBytes call with lang:%@ and words:%@", lang, words);
  NSError *__autoreleasing *error = NULL;

  NSString *bytes = KeyaddrWordsToBytes(lang, words, error);
  if (error) {
    reject(@"no_events", @"Issue calling keyaddrWordsToBytes", *error);
  } else {
    RCTLogInfo(@"keyaddrWordsToBytes converted words above to:%@", bytes);
    resolve(bytes);
  }
}

RCT_REMAP_METHOD(keyaddrWordsFromPrefix,lang:(NSString*)lang prefix:(NSString*)prefix max:(nonnull NSNumber*)max keyaddrWordsFromBytesWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"keyaddrWordsFromPrefix call with %@ prefix %@ max %@", lang, prefix, max);
  NSError *__autoreleasing *error = NULL;

  NSString *words = KeyaddrWordsFromPrefix(lang, prefix, [max longValue]);
  if (error) {
    reject(@"no_events", @"Issue calling keyaddrWordsFromPrefix", *error);
  } else {
    resolve(words);
  }
}

RCT_REMAP_METHOD(newKey,seed:(NSString*)seed resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"newKey call on %@", seed);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrNewKey(seed, error);

  if (error) {
    reject(@"no_events", @"Issue calling newKey", *error);
  } else {
    resolve([keyAddrKey key]);
  }
}

RCT_REMAP_METHOD(child,key:(NSString*)key index:(nonnull NSNumber*)index resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"child call on %@", key);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrFromString(key, error);
  KeyaddrKey *privateKey = [keyAddrKey child:[index intValue] error:error];

  if (error) {
    reject(@"no_events", @"Issue calling child", *error);
  } else {
    resolve([privateKey key]);
  }
}

RCT_REMAP_METHOD(hardenedChild,keyHC:(NSString*)keyHC index:(nonnull NSNumber*)index resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"hardenedChild call on %@", keyHC);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrFromString(keyHC, error);
  KeyaddrKey *privateKey = [keyAddrKey hardenedChild:[index intValue] error:error];

  if (error) {
    reject(@"no_events", @"Issue calling hardenedChild", *error);
  } else {
    resolve([privateKey key]);
  }
}

RCT_REMAP_METHOD(toPublic,key:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"toPublic call on %@", key);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrFromString(key, error);
  KeyaddrKey *publicKey = [keyAddrKey toPublic:error];

  if (error) {
    reject(@"no_events", @"Issue calling toPublic", *error);
  } else {
    resolve([publicKey key]);
  }
}

RCT_REMAP_METHOD(ndauAddress,ndauAddr:(NSString*)key resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"ndauAddress call on %@", key);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrFromString(key, error);
  KeyaddrAddress *address = [keyAddrKey ndauAddress:error];

  if (error) {
    reject(@"no_events", @"Issue calling ndauAddress", *error);
  } else {
    resolve([address address]);
  }
}

RCT_REMAP_METHOD(sign,key:(NSString*)key msgstr:(NSString*)msgstr resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"sign call with key:%@ and msgstr:%@", key, msgstr);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrFromString(key, error);
  KeyaddrSignature *sig = [keyAddrKey sign:msgstr error:error];
  RCTLogInfo(@"sign call created signature %@", sig);

  if (error) {
    reject(@"no_events", @"Issue calling sign", *error);
  } else {
    resolve([sig signature]);
  }
}

RCT_REMAP_METHOD(deriveFrom, parentKey:(NSString*)parentKey parentPath:(NSString*)parentPath childPath:(NSString*)childPath resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"deriveFrom call on %@", parentPath);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = KeyaddrDeriveFrom(parentKey, parentPath, childPath, error);

  if (error) {
    reject(@"no_events", @"Issue calling deriveFrom", *error);
  } else {
    resolve([keyAddrKey key]);
  }
}

RCT_REMAP_METHOD(CreatePublicAddress,seed:(NSString*)seed count:(NSInteger)count neuterithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject )
{
  RCTLogInfo(@"CreatePublicAddress call on %@", seed);
  NSError *__autoreleasing *error = NULL;
  KeyaddrKey *keyAddrKey = [[KeyaddrKey alloc] init:(seed)];
  NSMutableArray *array = [NSMutableArray arrayWithCapacity:count];

  for (int i = 1; i <= count; i++) {
    KeyaddrKey *publicKey = [keyAddrKey child:i error:error];
    KeyaddrAddress *address = [publicKey ndauAddress:error];
    NSString *addressString = [address address];
    [array addObject:addressString];
    RCTLogInfo(@"ndau addressString is:%@",addressString);
  }

  RCTLogInfo(@"array of addresses is:%@",array);

  if (error) {
    reject(@"no_events", @"Issue calling CreatePublicAddress", *error);
  } else {
    resolve(array);
  }
}

@end
