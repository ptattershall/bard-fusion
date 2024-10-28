"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface RegisterButtonProps {
  text: string
}

export default function RegisterButton({ text }: RegisterButtonProps) {
  const router = useRouter()
  return (
    <Button type="button" onClick={() => router.push('/register')}>{text}</Button>
  )
}