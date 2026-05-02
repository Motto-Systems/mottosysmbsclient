export class SkeletonBO {
    widthClass: string = "";
    count: number = 1;
    animation: 'progress' | 'pulse' | false = 'progress';
    theme: any = { height: '35px' };
}

export class ConfigOptions {
    class: string = 'w-100';
    theme: any = { height: '35px' };
}

export class FieldSkeletonBO {
    count: number = 1;
    options: ConfigOptions[] = [new ConfigOptions()];
}