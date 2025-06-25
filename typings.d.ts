declare module 'opensheetmusicdisplay' {
  export class OpenSheetMusicDisplay {
    zoom: number;
    constructor(container: string | HTMLElement, options?: any);
    load(xml: string): Promise<void>;
    render(): void;
    clear(): void;
  }
}