import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native';
import CheckBox from 'react-native-check-box';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';

class SetupTermsOfService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  checkedAgree = () => {
    this.setState({ agree: !this.state.agree });
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupEAINode',
      screen: 'ndau.SetupEAINode',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        qrToken: this.props.qrToken,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts,
        seedPhraseArray: this.props.seedPhraseArray
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      },
      backButtonHidden: true
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={this.props.parentStyles.container}>
          <ScrollView
            style={styles.contentContainer}
            showsVerticalScrollIndicator={true}
            indicatorStyle="white"
          >
            <Stepper screenNumber={7} />
            <View>
              <Text style={styles.legalTextHeading}>{'\n'}Scope</Text>
              <Text style={styles.legalText}>
                {'\n'}- These Terms of Use (“Terms”), together with our Privacy Notice , are a
                legally binding agreement between you (“User”, “you”, or any variations thereof) and
                Oneiro NA Inc. (collectively: “Oneiro”, “us”, “we”, or any variations thereof).
                {'\n'}If you do not agree with any of the Terms herein, kindly immediately cease any
                use of the Website and/or the platform (as defined below).
                {'\n'}- These Terms governs your browsing and any other use of the ndau.io website,
                including those matter pertaining to potential subscription for the NDAU tokens (the
                “Website” and “Tokens”, respectively), as further detailed on [https://Oneiro.io/].
                {'\n'}- From time to time, at our sole discretion, we may amend, change or replace
                these Terms, by posting updated versions on the Website, or by notifying you by
                other means. All such modifications to the Terms shall become effective upon the
                posting of the revised Terms or by receipt of notification of a change to the Terms.
                If you do not agree to the new or different Terms, you should not use or access the
                content offered under the Website.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}The Website</Text>
              <Text style={styles.legalText}>
                {'\n'}- The Website is designated to enable you to receive information regarding a
                unique type of Tokens by the name of NDAU, which we contemplate on issuing, as
                further detailed on the Website.
                {'\n'}- Users who desire to be eligible to subscribe for the Tokens, will be
                required to provide us with certain information and details, including without
                limitations, KYC (know-your-client) forms, AML identification forms, accredited
                investor forms (or other similar forms) and all other forms or information which we
                are required to maintain in connection thereto.
                {'\n'}- Nothing herein shall be deemed as any obligation and/or commitment Oneiro
                tgat you will actually be eligible to subscribe for any tokens.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Tokens</Text>
              <Text style={styles.legalText}>
                {'\n'}- The designated issuance of the Tokens is as further detailed here
                https://Oneiro.io/.
                {'\n'}- We do not make any representation and/or commitment in connection with the
                Tokens. In that respect, you hereby warrant and acknowledge that you have experience
                in cryptocurrency trading and acknowledges that (i) the cryptocurrency market is
                inherently volatile and is characterized in high risks, and thus subject to inherent
                uncertainties (such that no profits might derived in your favor, and furthermore
                that you might be subject to substantial losses regarding the Tokens subject matter
                to the Service provided herein, or the cryptocurrency acquired by you to exchange
                for our Tokens), and that (ii) you are able to fend for yourself, bear the economic
                risk associated in subscribing for the Tokens or other applicable cryptocurrency,
                and have such knowledge and experience in order to evaluate the merits and risks of
                the provision of subscribing for the Tokens.
                {'\n'}- Under no circumstances should any information presented under the website
                pertaining to the tokens, and specifically, any whitepaper we provide, be deemed as
                any recommendation to purchase, sell or otherwise trade in any cryptocurrencies
                prescribed thereunder, subject to applicable law. we do not possess any license or
                permit to recommend and/or otherwise make any investment on your behalf or favor,
                and thus you should consult with applicable professionals prior to making any
                decisions involving the trade of any cryptocurrency.
                {'\n'}- Specifically, we make no commitment as to the value of the tokens, THEIR
                ECONOMIC VALUE, nor the tradability of any tokens. We assume no responsibility
                regarding any decision undertaken by the applicable bodies which may affect the
                value of the tokens. FURTHERMORE, WE MAKE NO WARRANTY REGARDING the CLASSIFICATION
                OF the TOKENS (E.G., UTILITY, CURRENCY, EQUITY OR ANY EQUIVALENT THEREOF), SUCH
                THAT, among other matters, WE CANNOT REASONABLY advise WHICH TAX REGIME AND/OR
                SECURITIES REGULATION, SHALL APPLY TO THE TOKENS, if any. understanding the
                applicable regulation that applies to you is at your sole responsibility. However,
                we may, at our sole discretion, require you to provide us with certain information /
                representations (such as you being deemed as an acceredited investor) in order for
                us to determine whether to allow you to subscribe for our tokens.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Third party Vendors</Text>
              <Text style={styles.legalText}>
                {'\n'}- Currently, we use the third party vendors (each: a “Third Party Vendor”), as
                described under our Privacy Notice [add link + anchor]:
                {'\n'}- You understand that we have no control over the Third Party Vendor and its
                specific terms and conditions / privacy policy (regarding specific privacy matters,
                we do however periodically review with respect to each such Third Party Vendor [Note
                to NDAU- this should include all third party services you are utilizing – for
                example “mailchimp” or other platforms that you use to deliver newsletters, etc.],
                and thus shall not be responsible any services provided by the Third Party Vendor
                including any security compromise related thereto (including, without limitations,
                with respect to identity, password or any other information theft, security measures
                or lack thereof, data traffic, runtime, downtime, etc.) and/or any damage arising in
                connection with the use of such Third Party Vendor. You further acknowledge that you
                will be solely responsible to meet all applicable requirements and/or license terms
                which you are subject to pursuant to your use of the Third Party Vendor, imposed by
                it.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Security</Text>
              <Text style={styles.legalText}>
                {'\n'}- DESPITE US MAINTAINING REASONABLE MEASURES TO SECURE the Website, WE CAN NOT
                ENSURE FULL PROTECTION FROM EXPOSURE DUE TO MALICIOUS ACTS, AND THEREFORE ARE NOT
                LIABLE TO ANY DAMAGES, WHETHER DIRECT, INDIRECT, INCIDENTAL OR CONSEQUENTIAL,
                INCURRED BY USER.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Use of Website</Text>
              <Text style={styles.legalText}>
                {'\n'}- You acknowledge that any rights granted to you herein, are non-exclusive,
                such that any use of the content offered to you and/or made available to you via the
                Website, is subject to the herein terms.
                {'\n'}- Legal Age. You are not allowed to make any use of the Website in the event
                that you are under the age of 16 [or higher?].
                {'\n'}- Compliance. Notwithstanding anything to the contrary herein, you agree to
                abide by all applicable local, state, national and international laws and
                regulations in regards to your use of the Website and any content offered thereto.
                For the avoidance of doubt, the ability to access our Website does not necessarily
                means that your use is permitted under relevant laws, regulations and directives.
                {'\n'}- Additional Policies. In addition to the foregoing, while using the Website,
                you will strictly adhere with the Website policies published by us from time to
                time, such that, you should not:
                {'\n'} a. Browse, surf, process, scan or use the Website via operation of a computer
                program designed to gather information or perform operations imitating a human user
                (including, without limitation, Bots or Crawlers);
                {'\n'} b. Manipulate the URL of the Website, or otherwise gain access to any
                internal pages to which we did not provided you with a direct link (including,
                without limitation, URL Hacking);
                {'\n'} c. Transmit or otherwise make available any worm, virus, Trojan Horse,
                web-bug, spyware or any other program that is intended to damage the operation of
                the Website;
                {'\n'} d. Carry out any action which may infringe the copyrights and/or any other
                proprietary of us or any other copyright holder;
                {'\n'} e. Promote advertisements or disruptive commercial messages;
                {'\n'} f. Copy, transmit, decompile, modify, create derivative works, reproduce,
                disassemble, republish, scrape, and/or reverse engineer any algorithm, code, syntax
                and/or any other content associated with the Website and/or any components thereof
                and/or act to collect, harvest and/or data mine any data associated with the Website
                and/or any of its users (whether by computer programs, identity theft,
                impersonation, or otherwise) and/or take any action which may be deemed as
                impersonating another person or entity, identity theft, holding multiple Accounts,
                etc.;
                {'\n'} g. Handle and/or otherwise use any content offered or displayed on the
                Website in any manner or way that violates these Terms;
                {'\n'} h. Carry out any action which may infringe any laws, regulations, orders or
                any guidelines of any governmental authority, is likely to offend or harm any other
                users of the Website and/or the general public;
                {'\n'} i. Intimidate, threaten, harass or abuse anyone in any manner;
                {'\n'} j. Steal or attempt to steal passwords or other private information from
                other users of the Website;
                {'\n'} k. Distribute, post or make any other use (or otherwise encourage or solicit
                the consumption or performance of) any illegal, explicit, inappropriate, racist,
                offending, defaming, disparaging and/or abusing content, or any content which deems
                to infringe any third party proprietary rights (including our rights); and,
                {'\n'} l. Carry out any action which violates any community guidelines, Terms and/or
                Privacy Notice, as prescribed herein and/or as otherwise published us from time to
                time.
                {'\n'}- External Links. You understand that our Website may contain certain external
                links to third party websites (the “External Content”). The External Content might
                be based upon information collected by us from our users, in accordance with our
                Privacy Notice. Regardless, we have no control over the content of the External
                Content, the order of its presentation or its accuracy, and we are not a direct
                party to any transaction resulting from such External Content (if applicable), and
                therefore assume no responsibility and/or any liability in that respect. In
                addition, we provide no warranty that the access, browsing and/or consummation of
                any External Content shall be safe, nor that the owners or controllers of such
                External Content have undertaken any security or protection measures (for example,
                we cannot verify, nor do we warrant, that the External Content shall be free of any
                errors, malware, spyware, phishing, Trojan horses, data mining and/or collection, or
                the likes thereof). Your use of any External Content shall be at your sole risk. We
                highly recommend you to verify the origin of any External Content prior to gaining
                access or otherwise using it.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Content and Ownership</Text>
              <Text style={styles.legalText}>
                {'\n'}- Ownership. All rights, title and interest in and to the Website, including
                any and all copyrightable materials or any other content thereof which is or may be
                subject to any intellectual property rights under any applicable law, including any
                artwork, graphics, images, documents, content, website templates and widgets,
                literary work, source and object code, computer code (including HTML), applications,
                audio, music, video and other media, designs, animations, interfaces, methods,
                products, algorithms, data, interactive features and objects, advertising and
                acquisition tools and methods, inventions, trade secrets, logos, domains, customized
                URLs, service marks, trade names and other proprietary identifiers, whether or not
                registered and/or capable of being registered, and any derivations thereof, are
                owned by and/or licensed to us (“Proprietary Content”). In the event that the
                Proprietary Content is licensed to us, then such content might be subject to
                additional restrictions by its owners.
                {'\n'}- Right to Use. You may only use the Proprietary Content for view under our
                Website, and for this purpose alone; subject further to the specific provisions of
                these Terms. In order to remove any doubt, you are restricted from making any copies
                of the Proprietary Content (whether tangible or electronic), transfer, distribute
                and/or otherwise disseminate any Proprietary Content (or any portion thereof).
                {'\n'}- No Other Rights. It is hereby clarified that these Terms do not grant any
                right or interest in or to our intellectual property (or any part thereof),
                including without limitations, any of our Proprietary Content, except only for the
                limited license expressly granted above. Nothing in these Terms constitutes an
                assignment or waiver of any of our property rights under any law.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Privacy and Data Protection</Text>
              <Text style={styles.legalText}>
                {'\n'}- In addition to these Terms, your use of the Website is also subject to our
                Privacy Notice, which informs you of our policies and procedures regarding the
                collection, use and disclosure of information we receive when you visit our Website
                and when communicating with us.
                {'\n'}- DESPITE US MAINTAINING REASONABLE MEASURES TO SECURE AND PROTECT YOUR
                ACCOUNT INFORMATION REGARDING USER’S ACCESS TO THE WEBSITE, WE CANNOT ENSURE FULL
                PROTECTION FROM EXPOSURE DUE TO MALICIOUS ACTS, AND THEREFORE ARE NOT BE LIABLE TO
                ANY DAMAGES, WHETHER DIRECT, INDIRECT, INCIDENTAL OR CONSEQUENTIAL, INCURRED BY USER
                DUE TO ANY SUCH EXPOSURE OF ACCOUNT CONTENTS OR INFORMATION REGARDING USER’S ACCESS.
                YOU ARE HIGHLY ENCOURAGED TO MAINTAIN THE REQUISITE PROTECTION FOR YOUR MACHINE,
                SUCH AS MAINTANING AN UP-TO-DATE ANTIVIRUS AND/OR ANY ANTIMALWARE OR PHISHING
                SOFTWARE.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Limited Warranties</Text>
              <Text style={styles.legalText}>
                {'\n'}- THE WEBSITE and any content associated thereto ARE PROVIDED ON AN “AS IS”
                AND “AS AVAILABLE” BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.
                {'\n'}- WITHOUT LIMITING THE ABOVE, (I) WE MAKE NO WARRANTY THAT THE WEBSITE,
                analysis under any of our whitepaer and/OR any other CONTENT WILL MEET YOUR
                REQUIREMENTS, OR WILL BE UNINTERRUPTED, CONTINUOUS, TIMELY, SECURE, ACCURATE,
                CORRECT, COMPLETE OR AVAILABILE; including without limitations, in connection with
                any errors, bugs, viruses, Trojan horses and/or any other form of malware, server
                runtime and/or downtime (including any interruption or cessation of any data
                received and/or otherwise transmitted within the scope of the use of the Website),
                server security measures, content Provided by other users and/or yourself (including
                any personal, financial and/or any other information) or for any loss or damage of
                any kind incurred as a result of the use of any content posted, transmitted, or
                otherwise made available via the Website, OR IN CONNECTION WITH ANY USERS'
                (INCLUDING YOURSELF) VIOLATION OF THESE TERMS. (II) WE DO NO ENDORSE OR APPROVE ANY
                CONTENT PROVIDED BY ANY PARTY THAN US AND DISCLAIM ALL LIABLITY WHATSOEVER THERETO;
                AND (III) WE DO NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE of the
                website, nOR THEir RESULTS, CORRECTNESS, COMPLETENESS, AVAILABILITY, ACCURACY,
                RELIABILITY OR OTHERWISE. NOTHING HEREIN SHALL DEROGATE FROM ANY OTHER LIMITATION OF
                LIABILITY PRESCRIBED UNDER THESE TERMS.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Limitation of Liability</Text>
              <Text style={styles.legalText}>
                {'\n'}- TO THE FULLEST EXTENT PERMITTED BY LAW, UNDER NO CIRCUMSTANCES SHALL WE BE
                LIABLE FOR ANY DIRECT OR INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, EXEMPLARY OR
                CONSEQUENTIAL DAMAGES (including any financial losses) ARISING OUT OF ANY (I) USE,
                OR THE INABILITY (FOR ANY REASON) TO USE ANY PART OF THIS WEBSITE (INCLUDING WITHOUT
                LIMITATION INACCURACIES OR ERRORS OF INFORMATION AS A RESULT OF ACCESSING THIS
                WEBSITE) or any failed transfer of any funds under a Wallet to its designated
                location, (II) ACTION OR INACTION IN CONNECTION WITH THESE TERMS, OR (III)
                STATEMENTS OR CONDUCT OF YOU OR ANY THIRD PARTY ON THIS WEBSITE OR YOUR WEBSITE,
                INCULDING WITHOUT LIMITATION ANY SUBMISSIONS THEREON; IN EACH CASE, INCLUDING BUT
                NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, EVEN IF WE HAVE BEEN ADVISED OF THE
                POSSIBILITY OF SUCH DAMAGES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT
                LIABILITY OR OTHERWISE.
                {'\n'}- SHOULD ABOVE EXCLUSION BE HELD BY THE COMPETENT COURTS AS UNENFORCEABLE OR
                VOID, THE CUMULATIVE LIABILITY TO USER FOR ANY AND ALL CLAIMS RELATING TO THE
                Website (WHETHER OR NOT PROVIDED BY THE USER) AND/OR DUE TO THE NON-AVAILABILITY
                THEREOF, SHALL NOT EXCEED THE LOWER OF THE TOTAL AMOUNT PAID BY USER AS
                CONSIDERATION FOR THE USE OF THE WEBSITE (IF PAID) OR $100.
                {'\n'}- WITHOUT DEROGATING FROM THE GENERAL NATURE OF THE FOREGOING, WE ASSUME NO
                LIABILITY FOR ANY DAMAGES CAUSED BY VIRUSES, WORMS AND/OR OTHER MALICIOUS SOFTWARE
                WHICH MAY INFECT THE USER'S MACHINE(S) WITHIN THE SCOPE OF THE USE OF THE website.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Indemnification</Text>
              <Text style={styles.legalText}>
                {'\n'}- YOU SHALL INDEMNIFY US, including our DIRECTORS AND OFFICERS, EMPLOYEES,
                SERVICE PROVIDERS AND/OR ANY AFFILIATES (COLLECTIVELY: THE “INDEMNITEES”), FOR
                CLAIMS, SUITS, LOSSES AND/OR DAMAGES RESULTING FROM YOUR USE OF, ACCESS TO OR
                RELIANCE ON THE WEBSITE ANS/OR any content presented thereto.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Governing Law; Class Action Waiver</Text>
              <Text style={styles.legalText}>
                {'\n'}- Subject to any applicable law, all disputes between you and we shall only be
                resolved on an individual basis and you shall not have the right to bring any claim
                against us as a plaintiff or a member of a class, consolidated or representative
                actions (or any other legal proceedings conducted by a group or by representatives
                on behalf of others).
                {'\n'}- To the maximum extent permitted by law, these Terms is governed by the laws
                of the State of Washington, U.S.A. and you hereby consent to the exclusive
                jurisdiction and venue of courts in San Mateo County, California, U.S.A. in all
                disputes arising out of or relating to the use of the Website. Use of the Website is
                unauthorized in any jurisdiction that does not give effect to all provisions of
                these terms and conditions, including without limitation this paragraph. You agree
                that no joint venture, partnership, employment, or agency relationship exists
                between you and Oneiro as a result of this agreement or use of the Website.
                {'\n'}- Out performance of these Terms is subject to existing laws and legal
                process, and nothing contained in this agreement is in derogation of our right /
                obligation to comply with governmental, court and law enforcement requests or
                requirements relating to your use of the Website or information provided to or
                gathered by us with respect to such use. If any part of these Terms is determined to
                be invalid or unenforceable pursuant to applicable law including, but not limited
                to, the warranty disclaimers and liability limitations set forth above, then the
                invalid or unenforceable provision will be deemed superseded by a valid, enforceable
                provision that most closely matches the intent of the original provision and the
                remainder of the agreement shall continue in effect.
                {'\n'}- Unless otherwise specified herein, these Terms constitute the entire
                agreement between the User and Oneiro with respect to the Website and it supersedes
                all prior or contemporaneous communications and proposals, whether electronic, oral
                or written, between the User and Oneiro with respect to the Website and/or any
                content provided thereto. A printed version of these Terms and of any notice given
                in electronic form shall be admissible in judicial or administrative proceedings
                based upon or relating to these Terms to the same extent and subject to the same
                conditions as other business documents and records originally generated and
                maintained in printed form. It is the express wish to the parties that these Terms
                and all related documents be drawn up in English.
                {'\n'}- For the purposes hereof “Terms” shall also include our Privacy Notice, as
                amended from time to time.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Assignment</Text>
              <Text style={styles.legalText}>
                {'\n'}- You may not assign any rights and/or obligations you may have under these
                Terms and/or Privacy Notice without our prior written consent. We may freely assign
                any of its rights and/or obligations herein, without limitations; provided that,
                your rights herein shall not be adversely affected.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Survival</Text>
              <Text style={styles.legalText}>
                {'\n'}- It is hereby clarifeid that THE TERMS OF SECTIONS ‎7, ‎9 THROUGH ‎11
                (Inclusive), AND SECTION ‎12 SHALL SURVIVE ANY TERMINATION of our engagement in
                connection with the website, REGARDLESS OF REASON.
              </Text>
              <Text style={styles.legalTextHeading}>{'\n'}Contacting Us</Text>
              <Text style={styles.legalText}>
                {'\n'}- If you have cause to believe any content found in the Website (including
                such content provided by other users) to be in violation of these Terms and/or
                infringe any 3rd party proprietary rights and/or applicable law, kindly notify us of
                such content via email to info@Oneiro.io stating the violating content and the
                nature of violation.{'\n'}
              </Text>
              <CheckBox
                style={this.props.parentStyles.checkbox}
                onClick={() => this.checkedAgree()}
                isChecked={this.state.agree}
                rightText="I agree to the terms of use"
                rightTextStyle={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontFamily: 'TitilliumWeb-Regular'
                }}
                checkBoxColor="#ffffff"
              />
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.onPushAnother} title="Next" disabled={!this.state.agree} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end',
    marginTop: 20
  },
  progress: {
    paddingTop: 30,
    paddingBottom: 30
  },
  legalText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular'
  },
  legalTextHeading: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Regular',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
});

export default SetupTermsOfService;
