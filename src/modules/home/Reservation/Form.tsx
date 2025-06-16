
"use client"

import React from "react"
import z from "zod"
import { toast } from "sonner"
import { db_firestore } from "@/configs/firebase"
import { doc, setDoc } from "firebase/firestore"
import { uniqueId } from "@/lib/utils"

const pattern = /[<>*'"`=)(:;\/\\]/

const initialForm = {
  name: "",
  total: "",
  children: "",
  accommodation: "",
  menu: "",
  message: "",
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Numele este necesar" }).max(50, { message: "Maxim 50 de caractere" }).refine((v) => !pattern.test(v), { message: "Caractere speciale interzise" }),
  total: z.string().min(1, { message: "Alege nr persoane" }),
  children: z.string().min(1, { message: "Selectează nr copii" }),
  accommodation: z.string().min(1, { message: "Selectează cazare" }),
  menu: z.string().min(1, { message: "Selectează tipul de meniu" }),
  message: z.string().max(200).optional()
})

type Errors = { [field: string]: string[] }
type FormData = z.infer<typeof formSchema>

export default function Form() {
  const [form, setForm] = React.useState(initialForm)
  const [formErrors, setFormErrors] = React.useState({} as Errors)

  async function addReservation(value: FormData) {
    const collectionName = "reservations"
    const id = uniqueId(collectionName)

    await setDoc(doc(db_firestore, collectionName, id), {
      ...value,
      created_at: Date.now()
    })
  }

  function handleChange<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(e: React.ChangeEvent<T>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault()
    setFormErrors({})

    try {
      const value: FormData = formSchema.parse(form)
      await addReservation(value)

      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value)
      })

      toast.success("Formular trimis cu succes")
      setForm(initialForm)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setFormErrors(err.flatten().fieldErrors as Errors)
      }
    }
  }

  function FieldError({ name }: { name: string }) {
    return formErrors[name] && <span className="text-sm text-red-600">{formErrors[name].join(", ")}</span>
  }

  return (
    <form onSubmit={submit} className="space-y-3 mt-10 max-w-xl mx-auto px-5 md:px-0" autoComplete="off">
      <div className="space-y-1">
        <input
          type="text"
          name="name"
          placeholder="Nume și prenume"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0"
        />
        <FieldError name="name" />
      </div>

      {[
        { name: "total", label: "Nr persoane", options: ["1", "2", "3", "4"] },
        { name: "children", label: "Vei veni cu copii?", options: ["0", "1", "2", "3", "4", "5"] },
        { name: "accommodation", label: "Cazare", options: ["Da, doresc cazare", "Nu, nu doresc cazare"] },
        { name: "menu", label: "Tip meniu", options: ["Standard", "Vegetarian"] },
      ].map(({ name, label, options }) => (
        <div className="space-y-1" key={name}>
          <label className="block text-sm font-medium">{label}</label>
          <select
            name={name}
            value={(form as any)[name]}
            onChange={handleChange}
            className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0"
          >
            <option value="">Alege o opțiune</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <FieldError name={name} />
        </div>
      ))}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Dorești să ne transmiți ceva?</label>
        <textarea
          name="message"
          placeholder="Mesaj (opțional)"
          autoComplete="off"
          value={form.message}
          onChange={handleChange}
          maxLength={200}
          rows={4}
          className="block w-full rounded-md bg-gray-100 border-transparent focus:border-ivory focus:bg-white focus:ring-0 resize-none"
        />
        <FieldError name="message" />
      </div>

      <div className="flex justify-end pt-4">
        <button className="bg-black text-white rounded-md px-10 py-2 text-sm md:text-base">
          Trimite
        </button>
      </div>
    </form>
  )
}
