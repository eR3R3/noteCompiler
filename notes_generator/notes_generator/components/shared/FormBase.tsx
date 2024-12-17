'use client'

import React, {useEffect, useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Form} from "../ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {Textarea} from "@/components/ui/textarea";
import {CustomField} from "@/components/shared/CustomField";

interface FormBaseProp {
  getContent: any,
  isSubmit: boolean,
  isCourseType: boolean,
  isGenerate: boolean,
  onSubmit: any,
  output: string
}

const defaultValues = {
  username:"",
  prompt: "",
  tag: "#",
  course: '',
  ans:"",
  isPublic: true
};

const FormBase = ({isCourseType, getContent, output, isGenerate, isSubmit, onSubmit}: FormBaseProp) => {

  const form = useForm({defaultValues})
  const [courseType, setCourseType] = useState<string>("IB")
  const [tag, setTag] = useState<string>("")
  const [prompt, setPrompt] = useState<string>("")
  const [note, setNote] = useState<string>(output)

  useEffect(() => {
    setNote(output);
  }, [output]);

  const selectHandler = (eValue: string, onChange: (value: string) => void) => {
    setCourseType(eValue)
    return onChange(eValue)
  }

  const tagHandler = (eValue: string, onChange: any) => {
    setTag(eValue)
    return onChange(eValue)
  }

  const promptHandler = (eValue: string, onChange: any) => {
    setPrompt(eValue)
    onChange(eValue)
  }

  function noteHandler(eValue: string, onChange: any) {
    setNote(eValue)
    onChange(eValue)
  }

  return (
      <div>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <CustomField
                control={form.control}
                name="prompt"
                formLabel="Type your notes here"
                className="w-full"
                render={({field}: {field: any}) => (
                    <Textarea
                     value={field.value}
                     placeholder="Type here"
                     className="w-full h-24 textarea-field"
                     onChange={(e)=>promptHandler(e.target.value, field.onChange)}/>
                )}/>
            <div className="flex justify-between w-full gap-8 mt-4">
              <CustomField
                  control={form.control}
                  name="tag"
                  formLabel="Type your tag here"
                  className="w-full"
                  render={({field}: { field: any; }) => (
                      <Input
                      placeholder="Type here" {...field}
                      className="w-full input-field"
                      onChange={(e)=>tagHandler(e.target.value, field.onChange)}/>
                  )}/>
              {isCourseType && <CustomField
                  control={form.control}
                  name="course"
                  formLabel="Select Course Type"
                  className=""
                  render={({field}: { field: any}) => (
                      <Select
                      onValueChange={(value) => selectHandler(value, field.onChange)}
                      value={field.value}>
                        <SelectTrigger className="w-[180px] select-field">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">AP</SelectItem>
                          <SelectItem value="dark">IB</SelectItem>
                          <SelectItem value="system">China System</SelectItem>
                        </SelectContent>
                      </Select>
                  )}/>}
              <Button
                  type="button"
                  onClick={()=>getContent(prompt, tag, courseType)}
                  className="submit-button capitalize"
                  disabled={isGenerate}>
                {isGenerate ? 'Generating...' : 'Generate'}
              </Button>
            </div>
            <CustomField
                control={form.control}
                name="ans"
                formLabel="Type your notes here"
                className="w-full h-64 mt-3"
                render={({field}: {field: any}) => (
                    <Textarea
                    placeholder="Type here"
                    className="w-full h-full textarea-field"
                    value={note}
                    onChange={(e)=>noteHandler(e.target.value, field.onChange)}/>
                )}/>
            <div className="mt-4 flex justify-end">
              <Button
                  type="submit"
                  onClick={()=>getContent(prompt, tag, courseType)}
                  className="submit-button capitalize"
                  disabled={isSubmit}>
                {isSubmit ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
  );
};

export default FormBase;
