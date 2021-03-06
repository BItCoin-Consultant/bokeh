import {ButtonGroup, ButtonGroupView} from "./button_group"

import {Class} from "core/class"
import {classes} from "core/dom"
import * as p from "core/properties"

export class RadioButtonGroupView extends ButtonGroupView {
  model: RadioButtonGroup

  connect_signals(): void {
    super.connect_signals()
    this.connect(this.model.properties.active.change, () => this._update_active())
  }

  change_active(i: number): void {
    if (this.model.active !== i) {
      this.model.active = i

      if (this.model.callback != null)
        this.model.callback.execute(this.model)
    }
  }

  protected _update_active(): void {
    const {active} = this.model

    this._buttons.forEach((button, i) => {
      classes(button).toggle("bk-active", active === i)
    })
  }
}

export namespace RadioButtonGroup {
  export type Attrs = p.AttrsOf<Props>

  export type Props = ButtonGroup.Props & {
    active: p.Property<number | null>
  }
}

export interface RadioButtonGroup extends RadioButtonGroup.Attrs {}

export class RadioButtonGroup extends ButtonGroup {
  properties: RadioButtonGroup.Props
  default_view: Class<RadioButtonGroupView>

  constructor(attrs?: Partial<RadioButtonGroup.Attrs>) {
    super(attrs)
  }

  static initClass(): void {
    this.prototype.type = "RadioButtonGroup"
    this.prototype.default_view = RadioButtonGroupView

    this.define<RadioButtonGroup.Props>({
      active: [ p.Any, null ],
    })
  }
}
RadioButtonGroup.initClass()
