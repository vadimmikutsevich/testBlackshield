import React, {memo, useEffect, useState, useCallback} from "react";
import { Form, Input } from "antd";
import { FieldType, PropListTypes, PropItemTypes } from "../types";

// List of inputs
const regExpMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export const RenderFields: React.FC<PropListTypes> = memo(({
    configuration,
    setInputsData
}) => {
    const [data, setData] = useState<{[key: string]: string} | Record<string, never>>({})

    useEffect(() => {
        const initialState: {[key: string]: string} = {}
        
        configuration.forEach((inputEl) => {
            initialState[inputEl.id] = inputEl.defaultValue ?? ''
        })


        setData(initialState)
    }, [configuration])

    const handleInput = useCallback((id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => {
            return {...prev, [id]: e.target.value}
        })
    }, [])

    useEffect(() => {
        let isReadtForm = true

        for(let i = 0; i < configuration.length; i++) {
            const settingsInput = configuration[i]

            if(settingsInput.required) {

                if(settingsInput.type === FieldType.InputEmail) {
                    isReadtForm = regExpMail.test(data[settingsInput.id])
                    break
                } else if(!data[settingsInput.id]) {
                    isReadtForm = false 
                    break
                }
            }
        }

        setInputsData(data, isReadtForm)
 
    }, [configuration, data, setInputsData])

    return (
        <Form
            name="basic"
            style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '1rem'}}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
        >
            {configuration.map((inputEl) => {

                switch(inputEl.type) {
                    case FieldType.InputText:
                        return <RenderInput key={inputEl.id} inputSettings={inputEl} value={data[inputEl.id]} setValue={handleInput} />
                    case FieldType.InputEmail:

                        return <RenderInput key={inputEl.id} regExp={regExpMail} inputSettings={inputEl} value={data[inputEl.id]} setValue={handleInput}/>
                    case FieldType.IinputPassword:
                        return <RenderInput key={inputEl.id} inputSettings={inputEl} value={data[inputEl.id]} setValue={handleInput} isPassword/>
                }
            })}
        </Form>
    )
})

// Input item

const RenderInput: React.FC<PropItemTypes> = memo(({
    inputSettings,
    value,
    setValue,
    isPassword,
    regExp
}) => {

    return (
        <Form.Item
            initialValue={inputSettings.defaultValue}
            name={inputSettings.id}
            label={inputSettings.label}
            rules={[{
                required: inputSettings.required,
                message: `Please input your ${inputSettings.label}!`,
                pattern: regExp,
                }]}>

                {isPassword ? (
                     <Input.Password value={value} onChange={(e) => setValue(inputSettings.id, e)}/>
                ) : (
                    <Input value={value} onChange={(e) => setValue(inputSettings.id, e)}/>
                )}

        </Form.Item>
    )
})
