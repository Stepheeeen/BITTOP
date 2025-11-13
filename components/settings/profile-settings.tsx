"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import { API_URL } from "@/lib/constant"
import { getSession } from "@/lib/auth"

export function ProfileSettings() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [phone, setPhone] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [savingPhone, setSavingPhone] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const session = getSession()
  const token = session?.token

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await axios.get(`${API_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Profile data:", res)
        setProfile(res.data)
        setPhone(res.data.phone || "")
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token])

  const handlePhoneUpdate = async () => {
    setSavingPhone(true)
    try {
      await axios.patch(
        `${API_URL}/user/phone`,
        { phone },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert("Phone updated successfully")
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update phone")
    } finally {
      setSavingPhone(false)
    }
  }

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword) return alert("Fill both password fields")
    setSavingPassword(true)
    try {
      await axios.patch(
        `${API_URL}/user/password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert("Password updated successfully")
      setOldPassword("")
      setNewPassword("")
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update password")
    } finally {
      setSavingPassword(false)
    }
  }

  if (loading) return <p>Loading profile...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <Card className="p-6 bg-card border-border lg:col-span-2">
      <h2 className="text-xl font-bold text-foreground mb-6">Profile Information</h2>

      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
        <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{profile.username || "User"}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
        {/* <Button size="sm" variant="outline" className="ml-auto bg-transparent">
          Change Photo
        </Button> */}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Full Name</label>
          <Input value={profile.fullName || ""} disabled className="bg-muted border-border" />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Email</label>
          <Input value={profile.email} disabled type="email" className="bg-muted border-border" />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">Phone</label>
          <Input
            value={phone}
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            className="bg-muted border-border"
          />
          <Button
            className="mt-2"
            onClick={handlePhoneUpdate}
            disabled={savingPhone}
          >
            {savingPhone ? "Saving..." : "Update Phone"}
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <label className="text-sm font-semibold text-foreground block mb-2">Change Password</label>
          <Input
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="bg-muted border-border mb-2"
          />
          <Input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-muted border-border"
          />
          <Button
            className="mt-2"
            onClick={handlePasswordUpdate}
            disabled={savingPassword}
          >
            {savingPassword ? "Saving..." : "Update Password"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
