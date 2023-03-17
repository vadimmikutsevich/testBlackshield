export interface Configuration {
    id: string
    type: string
    label: string
    required: boolean
    defaultValue?: string
}

export interface PropListTypes {
    configuration: Configuration[],
    setInputsData: ( data: {[key: string]: string}, isFormReady: boolean) => void,
}

export interface PropItemTypes {
    inputSettings: Configuration
    value: string
    setValue: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void
    isPassword?: boolean
    regExp?: RegExp
}

export enum FieldType {
    InputText = 'inputText',
    InputEmail = 'inputEmail',
    IinputPassword = 'inputPassword'
}