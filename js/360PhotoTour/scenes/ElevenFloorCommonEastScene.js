/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

import {
    ViroScene,
    ViroOmniLight,
    Viro360Image,
    ViroMaterials,
    ViroNode,
    ViroAnimations,
    ViroAnimatedComponent,
    ViroUtils,
} from 'react-viro';
let polarToCartesian = ViroUtils.polarToCartesian;

var PortalElement = require('../custom_controls/PortalElement');
var LoadingSpinner = require('../custom_controls/LoadingSpinner');
var createReactClass = require('create-react-class');

var ElevenFloorCommonEastScene = createReactClass({
  getInitialState() {
    return {
      runAnimation: false,
    };
  },
  render: function() {
    var ElevenFloorCommonScene = require('../scenes/ElevenFloorCommonScene');
    return (
        <ViroScene style={styles.container} onClick={this._onTapBack}>
          <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                     attenuationStartDistance={40} attenuationEndDistance={50}
                     spotInnerAngle={0} spotOuterAngle={20} />
            <LoadingSpinner visible={!this.state.showSceneItems} position={polarToCartesian([-5, 50, 0])}  />
            <ViroNode visible={this.state.showSceneItems} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                <ViroAnimatedComponent animation="fadeIn" run={this.state.runAnimation} loop={false}>
                    <ViroNode opacity={0.0} position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
                        <Viro360Image source={require('../img/wework_11th_commons_east.jpg')} onLoadEnd={this._onLoadEnd} />
                        <PortalElement  backPortal={true}  iconOffset={1.75} sceneLength={1} scale={[.8,.8,1]} sceneText="Main Commons"
                                        position={polarToCartesian([-10, -65, 0])} jumpToScene={{scene:ElevenFloorCommonScene}} sceneNavigator={this.props.sceneNavigator}/>
                    </ViroNode>
                </ViroAnimatedComponent>
            </ViroNode>
        </ViroScene>
    );
  },
  _onTapBack() {
    this.props.sceneNavigator.pop();
  },
    _onLoadEnd(){
        if (this.state.showSceneItems != true) {
            this.setState({
                showSceneItems: true,
                runAnimation:true,
            });
        }
    },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ElevenFloorCommonEastScene;
