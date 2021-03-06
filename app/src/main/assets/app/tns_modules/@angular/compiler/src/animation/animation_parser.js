/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CompileAnimationAnimateMetadata, CompileAnimationGroupMetadata, CompileAnimationKeyframesSequenceMetadata, CompileAnimationSequenceMetadata, CompileAnimationStateDeclarationMetadata, CompileAnimationStyleMetadata, CompileAnimationWithStepsMetadata, identifierName } from '../compile_metadata';
import { StringMapWrapper } from '../facade/collection';
import { isBlank, isPresent } from '../facade/lang';
import { ParseError } from '../parse_util';
import { ANY_STATE, FILL_STYLE_FLAG } from '../private_import_core';
import { ElementSchemaRegistry } from '../schema/element_schema_registry';
import { AnimationEntryAst, AnimationGroupAst, AnimationKeyframeAst, AnimationSequenceAst, AnimationStateDeclarationAst, AnimationStateTransitionAst, AnimationStateTransitionExpression, AnimationStepAst, AnimationStylesAst, AnimationWithStepsAst } from './animation_ast';
import { StylesCollection } from './styles_collection';
var /** @type {?} */ _INITIAL_KEYFRAME = 0;
var /** @type {?} */ _TERMINAL_KEYFRAME = 1;
var /** @type {?} */ _ONE_SECOND = 1000;
export var AnimationParseError = (function (_super) {
    __extends(AnimationParseError, _super);
    /**
     * @param {?} message
     */
    function AnimationParseError(message) {
        _super.call(this, null, message);
    }
    /**
     * @return {?}
     */
    AnimationParseError.prototype.toString = function () { return "" + this.msg; };
    return AnimationParseError;
}(ParseError));
export var AnimationEntryParseResult = (function () {
    /**
     * @param {?} ast
     * @param {?} errors
     */
    function AnimationEntryParseResult(ast, errors) {
        this.ast = ast;
        this.errors = errors;
    }
    return AnimationEntryParseResult;
}());
function AnimationEntryParseResult_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationEntryParseResult.prototype.ast;
    /** @type {?} */
    AnimationEntryParseResult.prototype.errors;
}
export var AnimationParser = (function () {
    /**
     * @param {?} _schema
     */
    function AnimationParser(_schema) {
        this._schema = _schema;
    }
    /**
     * @param {?} component
     * @return {?}
     */
    AnimationParser.prototype.parseComponent = function (component) {
        var _this = this;
        var /** @type {?} */ errors = [];
        var /** @type {?} */ componentName = identifierName(component.type);
        var /** @type {?} */ animationTriggerNames = new Set();
        var /** @type {?} */ asts = component.template.animations.map(function (entry) {
            var /** @type {?} */ result = _this.parseEntry(entry);
            var /** @type {?} */ ast = result.ast;
            var /** @type {?} */ triggerName = ast.name;
            if (animationTriggerNames.has(triggerName)) {
                result.errors.push(new AnimationParseError("The animation trigger \"" + triggerName + "\" has already been registered for the " + componentName + " component"));
            }
            else {
                animationTriggerNames.add(triggerName);
            }
            if (result.errors.length > 0) {
                var /** @type {?} */ errorMessage_1 = "- Unable to parse the animation sequence for \"" + triggerName + "\" on the " + componentName + " component due to the following errors:";
                result.errors.forEach(function (error) { errorMessage_1 += '\n-- ' + error.msg; });
                errors.push(errorMessage_1);
            }
            return ast;
        });
        if (errors.length > 0) {
            var /** @type {?} */ errorString = errors.join('\n');
            throw new Error("Animation parse errors:\n" + errorString);
        }
        return asts;
    };
    /**
     * @param {?} entry
     * @return {?}
     */
    AnimationParser.prototype.parseEntry = function (entry) {
        var _this = this;
        var /** @type {?} */ errors = [];
        var /** @type {?} */ stateStyles = {};
        var /** @type {?} */ transitions = [];
        var /** @type {?} */ stateDeclarationAsts = [];
        entry.definitions.forEach(function (def) {
            if (def instanceof CompileAnimationStateDeclarationMetadata) {
                _parseAnimationDeclarationStates(def, _this._schema, errors).forEach(function (ast) {
                    stateDeclarationAsts.push(ast);
                    stateStyles[ast.stateName] = ast.styles;
                });
            }
            else {
                transitions.push(/** @type {?} */ (def));
            }
        });
        var /** @type {?} */ stateTransitionAsts = transitions.map(function (transDef) { return _parseAnimationStateTransition(transDef, stateStyles, _this._schema, errors); });
        var /** @type {?} */ ast = new AnimationEntryAst(entry.name, stateDeclarationAsts, stateTransitionAsts);
        return new AnimationEntryParseResult(ast, errors);
    };
    AnimationParser.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AnimationParser.ctorParameters = function () { return [
        { type: ElementSchemaRegistry, },
    ]; };
    return AnimationParser;
}());
function AnimationParser_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationParser.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    AnimationParser.ctorParameters;
    /** @type {?} */
    AnimationParser.prototype._schema;
}
/**
 * @param {?} stateMetadata
 * @param {?} schema
 * @param {?} errors
 * @return {?}
 */
function _parseAnimationDeclarationStates(stateMetadata, schema, errors) {
    var /** @type {?} */ normalizedStyles = _normalizeStyleMetadata(stateMetadata.styles, {}, schema, errors, false);
    var /** @type {?} */ defStyles = new AnimationStylesAst(normalizedStyles);
    var /** @type {?} */ states = stateMetadata.stateNameExpr.split(/\s*,\s*/);
    return states.map(function (state) { return new AnimationStateDeclarationAst(state, defStyles); });
}
/**
 * @param {?} transitionStateMetadata
 * @param {?} stateStyles
 * @param {?} schema
 * @param {?} errors
 * @return {?}
 */
function _parseAnimationStateTransition(transitionStateMetadata, stateStyles, schema, errors) {
    var /** @type {?} */ styles = new StylesCollection();
    var /** @type {?} */ transitionExprs = [];
    var /** @type {?} */ transitionStates = transitionStateMetadata.stateChangeExpr.split(/\s*,\s*/);
    transitionStates.forEach(function (expr) { transitionExprs.push.apply(transitionExprs, _parseAnimationTransitionExpr(expr, errors)); });
    var /** @type {?} */ entry = _normalizeAnimationEntry(transitionStateMetadata.steps);
    var /** @type {?} */ animation = _normalizeStyleSteps(entry, stateStyles, schema, errors);
    var /** @type {?} */ animationAst = _parseTransitionAnimation(animation, 0, styles, stateStyles, errors);
    if (errors.length == 0) {
        _fillAnimationAstStartingKeyframes(animationAst, styles, errors);
    }
    var /** @type {?} */ stepsAst = (animationAst instanceof AnimationWithStepsAst) ?
        animationAst :
        new AnimationSequenceAst([animationAst]);
    return new AnimationStateTransitionAst(transitionExprs, stepsAst);
}
/**
 * @param {?} alias
 * @param {?} errors
 * @return {?}
 */
function _parseAnimationAlias(alias, errors) {
    switch (alias) {
        case ':enter':
            return 'void => *';
        case ':leave':
            return '* => void';
        default:
            errors.push(new AnimationParseError("the transition alias value \"" + alias + "\" is not supported"));
            return '* => *';
    }
}
/**
 * @param {?} eventStr
 * @param {?} errors
 * @return {?}
 */
function _parseAnimationTransitionExpr(eventStr, errors) {
    var /** @type {?} */ expressions = [];
    if (eventStr[0] == ':') {
        eventStr = _parseAnimationAlias(eventStr, errors);
    }
    var /** @type {?} */ match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (!isPresent(match) || match.length < 4) {
        errors.push(new AnimationParseError("the provided " + eventStr + " is not of a supported format"));
        return expressions;
    }
    var /** @type {?} */ fromState = match[1];
    var /** @type {?} */ separator = match[2];
    var /** @type {?} */ toState = match[3];
    expressions.push(new AnimationStateTransitionExpression(fromState, toState));
    var /** @type {?} */ isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(new AnimationStateTransitionExpression(toState, fromState));
    }
    return expressions;
}
/**
 * @param {?} entry
 * @return {?}
 */
function _normalizeAnimationEntry(entry) {
    return Array.isArray(entry) ? new CompileAnimationSequenceMetadata(entry) : entry;
}
/**
 * @param {?} entry
 * @param {?} stateStyles
 * @param {?} schema
 * @param {?} errors
 * @param {?} permitStateReferences
 * @return {?}
 */
function _normalizeStyleMetadata(entry, stateStyles, schema, errors, permitStateReferences) {
    var /** @type {?} */ offset = entry.offset;
    if (offset > 1 || offset < 0) {
        errors.push(new AnimationParseError("Offset values for animations must be between 0 and 1"));
    }
    var /** @type {?} */ normalizedStyles = [];
    entry.styles.forEach(function (styleEntry) {
        if (typeof styleEntry === 'string') {
            if (permitStateReferences) {
                normalizedStyles.push.apply(normalizedStyles, _resolveStylesFromState(/** @type {?} */ (styleEntry), stateStyles, errors));
            }
            else {
                errors.push(new AnimationParseError("State based animations cannot contain references to other states"));
            }
        }
        else {
            var /** @type {?} */ stylesObj_1 = (styleEntry);
            var /** @type {?} */ normalizedStylesObj_1 = {};
            Object.keys(stylesObj_1).forEach(function (propName) {
                var /** @type {?} */ normalizedProp = schema.normalizeAnimationStyleProperty(propName);
                var /** @type {?} */ normalizedOutput = schema.normalizeAnimationStyleValue(normalizedProp, propName, stylesObj_1[propName]);
                var /** @type {?} */ normalizationError = normalizedOutput['error'];
                if (normalizationError) {
                    errors.push(new AnimationParseError(normalizationError));
                }
                normalizedStylesObj_1[normalizedProp] = normalizedOutput['value'];
            });
            normalizedStyles.push(normalizedStylesObj_1);
        }
    });
    return normalizedStyles;
}
/**
 * @param {?} entry
 * @param {?} stateStyles
 * @param {?} schema
 * @param {?} errors
 * @return {?}
 */
function _normalizeStyleSteps(entry, stateStyles, schema, errors) {
    var /** @type {?} */ steps = _normalizeStyleStepEntry(entry, stateStyles, schema, errors);
    return (entry instanceof CompileAnimationGroupMetadata) ?
        new CompileAnimationGroupMetadata(steps) :
        new CompileAnimationSequenceMetadata(steps);
}
/**
 * @param {?} stylesList
 * @param {?} newItem
 * @return {?}
 */
function _mergeAnimationStyles(stylesList, newItem) {
    if (typeof newItem === 'object' && newItem !== null && stylesList.length > 0) {
        var /** @type {?} */ lastIndex = stylesList.length - 1;
        var /** @type {?} */ lastItem = stylesList[lastIndex];
        if (typeof lastItem === 'object' && lastItem !== null) {
            stylesList[lastIndex] = StringMapWrapper.merge(/** @type {?} */ (lastItem), /** @type {?} */ (newItem));
            return;
        }
    }
    stylesList.push(newItem);
}
/**
 * @param {?} entry
 * @param {?} stateStyles
 * @param {?} schema
 * @param {?} errors
 * @return {?}
 */
function _normalizeStyleStepEntry(entry, stateStyles, schema, errors) {
    var /** @type {?} */ steps;
    if (entry instanceof CompileAnimationWithStepsMetadata) {
        steps = entry.steps;
    }
    else {
        return [entry];
    }
    var /** @type {?} */ newSteps = [];
    var /** @type {?} */ combinedStyles;
    steps.forEach(function (step) {
        if (step instanceof CompileAnimationStyleMetadata) {
            // this occurs when a style step is followed by a previous style step
            // or when the first style step is run. We want to concatenate all subsequent
            // style steps together into a single style step such that we have the correct
            // starting keyframe data to pass into the animation player.
            if (!isPresent(combinedStyles)) {
                combinedStyles = [];
            }
            _normalizeStyleMetadata(/** @type {?} */ (step), stateStyles, schema, errors, true)
                .forEach(function (entry) { _mergeAnimationStyles(combinedStyles, entry); });
        }
        else {
            // it is important that we create a metadata entry of the combined styles
            // before we go on an process the animate, sequence or group metadata steps.
            // This will ensure that the AST will have the previous styles painted on
            // screen before any further animations that use the styles take place.
            if (isPresent(combinedStyles)) {
                newSteps.push(new CompileAnimationStyleMetadata(0, combinedStyles));
                combinedStyles = null;
            }
            if (step instanceof CompileAnimationAnimateMetadata) {
                // we do not recurse into CompileAnimationAnimateMetadata since
                // those style steps are not going to be squashed
                var /** @type {?} */ animateStyleValue = ((step)).styles;
                if (animateStyleValue instanceof CompileAnimationStyleMetadata) {
                    animateStyleValue.styles =
                        _normalizeStyleMetadata(animateStyleValue, stateStyles, schema, errors, true);
                }
                else if (animateStyleValue instanceof CompileAnimationKeyframesSequenceMetadata) {
                    animateStyleValue.steps.forEach(function (step) {
                        step.styles = _normalizeStyleMetadata(step, stateStyles, schema, errors, true);
                    });
                }
            }
            else if (step instanceof CompileAnimationWithStepsMetadata) {
                var /** @type {?} */ innerSteps = _normalizeStyleStepEntry(step, stateStyles, schema, errors);
                step = step instanceof CompileAnimationGroupMetadata ?
                    new CompileAnimationGroupMetadata(innerSteps) :
                    new CompileAnimationSequenceMetadata(innerSteps);
            }
            newSteps.push(step);
        }
    });
    // this happens when only styles were animated within the sequence
    if (isPresent(combinedStyles)) {
        newSteps.push(new CompileAnimationStyleMetadata(0, combinedStyles));
    }
    return newSteps;
}
/**
 * @param {?} stateName
 * @param {?} stateStyles
 * @param {?} errors
 * @return {?}
 */
function _resolveStylesFromState(stateName, stateStyles, errors) {
    var /** @type {?} */ styles = [];
    if (stateName[0] != ':') {
        errors.push(new AnimationParseError("Animation states via styles must be prefixed with a \":\""));
    }
    else {
        var /** @type {?} */ normalizedStateName = stateName.substring(1);
        var /** @type {?} */ value = stateStyles[normalizedStateName];
        if (!isPresent(value)) {
            errors.push(new AnimationParseError("Unable to apply styles due to missing a state: \"" + normalizedStateName + "\""));
        }
        else {
            value.styles.forEach(function (stylesEntry) {
                if (typeof stylesEntry === 'object' && stylesEntry !== null) {
                    styles.push(/** @type {?} */ (stylesEntry));
                }
            });
        }
    }
    return styles;
}
var _AnimationTimings = (function () {
    /**
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     */
    function _AnimationTimings(duration, delay, easing) {
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
    }
    return _AnimationTimings;
}());
function _AnimationTimings_tsickle_Closure_declarations() {
    /** @type {?} */
    _AnimationTimings.prototype.duration;
    /** @type {?} */
    _AnimationTimings.prototype.delay;
    /** @type {?} */
    _AnimationTimings.prototype.easing;
}
/**
 * @param {?} keyframeSequence
 * @param {?} currentTime
 * @param {?} collectedStyles
 * @param {?} stateStyles
 * @param {?} errors
 * @return {?}
 */
function _parseAnimationKeyframes(keyframeSequence, currentTime, collectedStyles, stateStyles, errors) {
    var /** @type {?} */ totalEntries = keyframeSequence.steps.length;
    var /** @type {?} */ totalOffsets = 0;
    keyframeSequence.steps.forEach(function (step) { return totalOffsets += (isPresent(step.offset) ? 1 : 0); });
    if (totalOffsets > 0 && totalOffsets < totalEntries) {
        errors.push(new AnimationParseError("Not all style() entries contain an offset for the provided keyframe()"));
        totalOffsets = totalEntries;
    }
    var /** @type {?} */ limit = totalEntries - 1;
    var /** @type {?} */ margin = totalOffsets == 0 ? (1 / limit) : 0;
    var /** @type {?} */ rawKeyframes = [];
    var /** @type {?} */ index = 0;
    var /** @type {?} */ doSortKeyframes = false;
    var /** @type {?} */ lastOffset = 0;
    keyframeSequence.steps.forEach(function (styleMetadata) {
        var /** @type {?} */ offset = styleMetadata.offset;
        var /** @type {?} */ keyframeStyles = {};
        styleMetadata.styles.forEach(function (entry) {
            Object.keys(entry).forEach(function (prop) {
                if (prop != 'offset') {
                    keyframeStyles[prop] = ((entry))[prop];
                }
            });
        });
        if (isPresent(offset)) {
            doSortKeyframes = doSortKeyframes || (offset < lastOffset);
        }
        else {
            offset = index == limit ? _TERMINAL_KEYFRAME : (margin * index);
        }
        rawKeyframes.push([offset, keyframeStyles]);
        lastOffset = offset;
        index++;
    });
    if (doSortKeyframes) {
        rawKeyframes.sort(function (a, b) { return a[0] <= b[0] ? -1 : 1; });
    }
    var /** @type {?} */ firstKeyframe = rawKeyframes[0];
    if (firstKeyframe[0] != _INITIAL_KEYFRAME) {
        rawKeyframes.splice(0, 0, firstKeyframe = [_INITIAL_KEYFRAME, {}]);
    }
    var /** @type {?} */ firstKeyframeStyles = firstKeyframe[1];
    limit = rawKeyframes.length - 1;
    var /** @type {?} */ lastKeyframe = rawKeyframes[limit];
    if (lastKeyframe[0] != _TERMINAL_KEYFRAME) {
        rawKeyframes.push(lastKeyframe = [_TERMINAL_KEYFRAME, {}]);
        limit++;
    }
    var /** @type {?} */ lastKeyframeStyles = lastKeyframe[1];
    for (var /** @type {?} */ i = 1; i <= limit; i++) {
        var /** @type {?} */ entry = rawKeyframes[i];
        var /** @type {?} */ styles = entry[1];
        Object.keys(styles).forEach(function (prop) {
            if (!isPresent(firstKeyframeStyles[prop])) {
                firstKeyframeStyles[prop] = FILL_STYLE_FLAG;
            }
        });
    }
    var _loop_1 = function(i) {
        var /** @type {?} */ entry = rawKeyframes[i];
        var /** @type {?} */ styles = entry[1];
        Object.keys(styles).forEach(function (prop) {
            if (!isPresent(lastKeyframeStyles[prop])) {
                lastKeyframeStyles[prop] = styles[prop];
            }
        });
    };
    for (var /** @type {?} */ i = limit - 1; i >= 0; i--) {
        _loop_1(i);
    }
    return rawKeyframes.map(function (entry) { return new AnimationKeyframeAst(entry[0], new AnimationStylesAst([entry[1]])); });
}
/**
 * @param {?} entry
 * @param {?} currentTime
 * @param {?} collectedStyles
 * @param {?} stateStyles
 * @param {?} errors
 * @return {?}
 */
function _parseTransitionAnimation(entry, currentTime, collectedStyles, stateStyles, errors) {
    var /** @type {?} */ ast;
    var /** @type {?} */ playTime = 0;
    var /** @type {?} */ startingTime = currentTime;
    if (entry instanceof CompileAnimationWithStepsMetadata) {
        var /** @type {?} */ maxDuration_1 = 0;
        var /** @type {?} */ steps_1 = [];
        var /** @type {?} */ isGroup_1 = entry instanceof CompileAnimationGroupMetadata;
        var /** @type {?} */ previousStyles_1;
        entry.steps.forEach(function (entry) {
            // these will get picked up by the next step...
            var /** @type {?} */ time = isGroup_1 ? startingTime : currentTime;
            if (entry instanceof CompileAnimationStyleMetadata) {
                entry.styles.forEach(function (stylesEntry) {
                    // by this point we know that we only have stringmap values
                    var /** @type {?} */ map = (stylesEntry);
                    Object.keys(map).forEach(function (prop) { collectedStyles.insertAtTime(prop, time, map[prop]); });
                });
                previousStyles_1 = entry.styles;
                return;
            }
            var /** @type {?} */ innerAst = _parseTransitionAnimation(entry, time, collectedStyles, stateStyles, errors);
            if (isPresent(previousStyles_1)) {
                if (entry instanceof CompileAnimationWithStepsMetadata) {
                    var /** @type {?} */ startingStyles = new AnimationStylesAst(previousStyles_1);
                    steps_1.push(new AnimationStepAst(startingStyles, [], 0, 0, ''));
                }
                else {
                    var /** @type {?} */ innerStep = (innerAst);
                    (_a = innerStep.startingStyles.styles).push.apply(_a, previousStyles_1);
                }
                previousStyles_1 = null;
            }
            var /** @type {?} */ astDuration = innerAst.playTime;
            currentTime += astDuration;
            playTime += astDuration;
            maxDuration_1 = Math.max(astDuration, maxDuration_1);
            steps_1.push(innerAst);
            var _a;
        });
        if (isPresent(previousStyles_1)) {
            var /** @type {?} */ startingStyles = new AnimationStylesAst(previousStyles_1);
            steps_1.push(new AnimationStepAst(startingStyles, [], 0, 0, ''));
        }
        if (isGroup_1) {
            ast = new AnimationGroupAst(steps_1);
            playTime = maxDuration_1;
            currentTime = startingTime + playTime;
        }
        else {
            ast = new AnimationSequenceAst(steps_1);
        }
    }
    else if (entry instanceof CompileAnimationAnimateMetadata) {
        var /** @type {?} */ timings = _parseTimeExpression(entry.timings, errors);
        var /** @type {?} */ styles = entry.styles;
        var /** @type {?} */ keyframes = void 0;
        if (styles instanceof CompileAnimationKeyframesSequenceMetadata) {
            keyframes =
                _parseAnimationKeyframes(styles, currentTime, collectedStyles, stateStyles, errors);
        }
        else {
            var /** @type {?} */ styleData = (styles);
            var /** @type {?} */ offset = _TERMINAL_KEYFRAME;
            var /** @type {?} */ styleAst = new AnimationStylesAst(/** @type {?} */ (styleData.styles));
            var /** @type {?} */ keyframe = new AnimationKeyframeAst(offset, styleAst);
            keyframes = [keyframe];
        }
        ast = new AnimationStepAst(new AnimationStylesAst([]), keyframes, timings.duration, timings.delay, timings.easing);
        playTime = timings.duration + timings.delay;
        currentTime += playTime;
        keyframes.forEach(function (keyframe /** TODO #9100 */) { return keyframe.styles.styles.forEach(function (entry /** TODO #9100 */) { return Object.keys(entry).forEach(function (prop) { collectedStyles.insertAtTime(prop, currentTime, entry[prop]); }); }); });
    }
    else {
        // if the code reaches this stage then an error
        // has already been populated within the _normalizeStyleSteps()
        // operation...
        ast = new AnimationStepAst(null, [], 0, 0, '');
    }
    ast.playTime = playTime;
    ast.startTime = startingTime;
    return ast;
}
/**
 * @param {?} ast
 * @param {?} collectedStyles
 * @param {?} errors
 * @return {?}
 */
function _fillAnimationAstStartingKeyframes(ast, collectedStyles, errors) {
    // steps that only contain style will not be filled
    if ((ast instanceof AnimationStepAst) && ast.keyframes.length > 0) {
        var /** @type {?} */ keyframes = ast.keyframes;
        if (keyframes.length == 1) {
            var /** @type {?} */ endKeyframe = keyframes[0];
            var /** @type {?} */ startKeyframe = _createStartKeyframeFromEndKeyframe(endKeyframe, ast.startTime, ast.playTime, collectedStyles, errors);
            ast.keyframes = [startKeyframe, endKeyframe];
        }
    }
    else if (ast instanceof AnimationWithStepsAst) {
        ast.steps.forEach(function (entry) { return _fillAnimationAstStartingKeyframes(entry, collectedStyles, errors); });
    }
}
/**
 * @param {?} exp
 * @param {?} errors
 * @return {?}
 */
function _parseTimeExpression(exp, errors) {
    var /** @type {?} */ regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?/i;
    var /** @type {?} */ duration;
    var /** @type {?} */ delay = 0;
    var /** @type {?} */ easing = null;
    if (typeof exp === 'string') {
        var /** @type {?} */ matches = exp.match(regex);
        if (matches === null) {
            errors.push(new AnimationParseError("The provided timing value \"" + exp + "\" is invalid."));
            return new _AnimationTimings(0, 0, null);
        }
        var /** @type {?} */ durationMatch = parseFloat(matches[1]);
        var /** @type {?} */ durationUnit = matches[2];
        if (durationUnit == 's') {
            durationMatch *= _ONE_SECOND;
        }
        duration = Math.floor(durationMatch);
        var /** @type {?} */ delayMatch = matches[3];
        var /** @type {?} */ delayUnit = matches[4];
        if (isPresent(delayMatch)) {
            var /** @type {?} */ delayVal = parseFloat(delayMatch);
            if (isPresent(delayUnit) && delayUnit == 's') {
                delayVal *= _ONE_SECOND;
            }
            delay = Math.floor(delayVal);
        }
        var /** @type {?} */ easingVal = matches[5];
        if (!isBlank(easingVal)) {
            easing = easingVal;
        }
    }
    else {
        duration = (exp);
    }
    return new _AnimationTimings(duration, delay, easing);
}
/**
 * @param {?} endKeyframe
 * @param {?} startTime
 * @param {?} duration
 * @param {?} collectedStyles
 * @param {?} errors
 * @return {?}
 */
function _createStartKeyframeFromEndKeyframe(endKeyframe, startTime, duration, collectedStyles, errors) {
    var /** @type {?} */ values = {};
    var /** @type {?} */ endTime = startTime + duration;
    endKeyframe.styles.styles.forEach(function (styleData) {
        Object.keys(styleData).forEach(function (prop) {
            var /** @type {?} */ val = styleData[prop];
            if (prop == 'offset')
                return;
            var /** @type {?} */ resultIndex = collectedStyles.indexOfAtOrBeforeTime(prop, startTime);
            var /** @type {?} */ resultEntry /** TODO #9100 */, /** @type {?} */ nextEntry /** TODO #9100 */, /** @type {?} */ value;
            if (isPresent(resultIndex)) {
                resultEntry = collectedStyles.getByIndex(prop, resultIndex);
                value = resultEntry.value;
                nextEntry = collectedStyles.getByIndex(prop, resultIndex + 1);
            }
            else {
                // this is a flag that the runtime code uses to pass
                // in a value either from the state declaration styles
                // or using the AUTO_STYLE value (e.g. getComputedStyle)
                value = FILL_STYLE_FLAG;
            }
            if (isPresent(nextEntry) && !nextEntry.matches(endTime, val)) {
                errors.push(new AnimationParseError("The animated CSS property \"" + prop + "\" unexpectedly changes between steps \"" + resultEntry.time + "ms\" and \"" + endTime + "ms\" at \"" + nextEntry.time + "ms\""));
            }
            values[prop] = value;
        });
    });
    return new AnimationKeyframeAst(_INITIAL_KEYFRAME, new AnimationStylesAst([values]));
}
//# sourceMappingURL=animation_parser.js.map