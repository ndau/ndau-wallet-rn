/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { AppRegistry } from 'react-native'
import App from './src/app'
import LogStore from './src/stores/LogStore'
import 'react-native-get-random-values'
import './shim.js'
import crypto from 'crypto'
import BackgroundTasks from './src/services/BackgroundTasks'



AppRegistry.registerComponent('nduwallet', () => App)
BackgroundTasks.register()
