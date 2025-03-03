///
/// Copyright © 2016-2025 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { DAY, SECOND } from '@shared/models/time/time.models';

export const maxDeduplicateTimeSecs = DAY / SECOND;

export interface TimeseriesNodeConfiguration {
  processingSettings: ProcessingSettings;
  defaultTTL: number;
  useServerTs: boolean;
}

export interface TimeseriesNodeConfigurationForm extends Omit<TimeseriesNodeConfiguration, 'processingSettings'> {
  processingSettings: ProcessingSettingsForm
}

export type ProcessingSettings = BasicProcessingSettings & Partial<DeduplicateProcessingStrategy> & Partial<AdvancedProcessingStrategy>;

export type ProcessingSettingsForm = Omit<ProcessingSettings, keyof AdvancedProcessingStrategy> & {
  isAdvanced: boolean;
  advanced?: Partial<AdvancedProcessingStrategy>;
  type: ProcessingType;
};

export enum ProcessingType {
  ON_EVERY_MESSAGE = 'ON_EVERY_MESSAGE',
  DEDUPLICATE = 'DEDUPLICATE',
  WEBSOCKETS_ONLY = 'WEBSOCKETS_ONLY',
  ADVANCED = 'ADVANCED',
  SKIP = 'SKIP'
}

export const ProcessingTypeTranslationMap = new Map<ProcessingType, string>([
  [ProcessingType.ON_EVERY_MESSAGE, 'rule-node-config.save-time-series.strategy-type.every-message'],
  [ProcessingType.DEDUPLICATE, 'rule-node-config.save-time-series.strategy-type.deduplicate'],
  [ProcessingType.WEBSOCKETS_ONLY, 'rule-node-config.save-time-series.strategy-type.web-sockets-only'],
  [ProcessingType.SKIP, 'rule-node-config.save-time-series.strategy-type.skip'],
])

export interface BasicProcessingSettings {
  type: ProcessingType;
}

export interface DeduplicateProcessingStrategy extends BasicProcessingSettings{
  deduplicationIntervalSecs: number;
}

export interface AdvancedProcessingStrategy extends BasicProcessingSettings{
  timeseries: AdvancedProcessingConfig;
  latest: AdvancedProcessingConfig;
  webSockets: AdvancedProcessingConfig;
}

export type AdvancedProcessingConfig = WithOptional<DeduplicateProcessingStrategy, 'deduplicationIntervalSecs'>;

export const defaultAdvancedProcessingConfig: AdvancedProcessingConfig = {
  type: ProcessingType.ON_EVERY_MESSAGE
}

export const defaultAdvancedPersistenceStrategy: Omit<AdvancedProcessingStrategy, 'type'> = {
  timeseries: defaultAdvancedProcessingConfig,
  latest: defaultAdvancedProcessingConfig,
  webSockets: defaultAdvancedProcessingConfig,
}
