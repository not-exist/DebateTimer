import { loadState, saveState, cloneAsCustom } from "../core/storage";
import type { FlowTemplate, MatchState, Preferences } from "../core/models";
import { PRESETS, findPreset } from "../core/presets";

const initial = loadState();

class ConfigStore {
  match = $state<MatchState>(initial.match);
  customTemplates = $state<FlowTemplate[]>(initial.customTemplates);
  preferences = $state<Preferences>(initial.preferences);

  get template(): FlowTemplate | undefined {
    return (
      findPreset(this.match.templateId) ??
      this.customTemplates.find((t) => t.id === this.match.templateId)
    );
  }

  get allTemplates(): FlowTemplate[] {
    return [...PRESETS, ...this.customTemplates];
  }

  /** 内置模板不允许原地修改：编辑时先另存为自定义 */
  deriveCustom(): FlowTemplate {
    const base = this.template;
    const copy = base ? cloneAsCustom(base) : cloneAsCustom(PRESETS[0]);
    this.customTemplates.push(copy);
    this.match.templateId = copy.id;
    return copy;
  }

  useTemplate(id: string): void {
    this.match.templateId = id;
    this.match.stageIndex = 0;
    this.save();
  }

  save(): void {
    saveState({
      match: $state.snapshot(this.match) as MatchState,
      customTemplates: $state.snapshot(this.customTemplates) as FlowTemplate[],
      preferences: $state.snapshot(this.preferences) as Preferences,
    });
  }
}

export const config = new ConfigStore();
