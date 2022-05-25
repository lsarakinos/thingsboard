///
/// Copyright © 2016-2022 The Thingsboard Authors
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { selectHasVersionControl } from '@core/auth/auth.selectors';
import { HasConfirmForm } from '@core/guards/confirm-on-exit.guard';
import { VersionControlSettingsComponent } from '@home/components/vc/version-control-settings.component';
import { FormGroup } from '@angular/forms';
import { EntityId } from '@shared/models/id/entity-id';

@Component({
  selector: 'tb-version-control',
  templateUrl: './version-control.component.html',
  styleUrls: ['./version-control.component.scss']
})
export class VersionControlComponent implements OnInit, HasConfirmForm {

  @ViewChild('versionControlSettingsComponent', {static: false}) versionControlSettingsComponent: VersionControlSettingsComponent;

  @Input()
  detailsMode = false;

  @Input()
  active = true;

  @Input()
  singleEntityMode = false;

  @Input()
  externalEntityId: EntityId;

  @Input()
  entityId: EntityId;

  hasVersionControl$ = this.store.pipe(select(selectHasVersionControl));

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {

  }

  confirmForm(): FormGroup {
    return this.versionControlSettingsComponent?.versionControlSettingsForm;
  }

}
