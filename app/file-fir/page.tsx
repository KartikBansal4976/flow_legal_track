// Add animations to the FIR filing page

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"
import jsPDF from "jspdf"
import axios from "axios"

export default function FileFIRPage() {
  const [activeTab, setActiveTab] = useState("personal")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [idType, setIdType] = useState("aadhar")
  const [idNumber, setIdNumber] = useState("")

  const [incidentDate, setIncidentDate] = useState("")
  const [incidentTime, setIncidentTime] = useState("")
  const [incidentLocation, setIncidentLocation] = useState("")
  const [incidentDescription, setIncidentDescription] = useState("")
  const [incidentType, setIncidentType] = useState("theft")
  const [witnesses, setWitnesses] = useState("")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const generatePdf = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Online FIR Report", 20, 20)

    doc.setFontSize(12)
    doc.text(`Name: ${firstName} ${lastName}`, 20, 40)
    doc.text(`Email: ${email}`, 20, 50)
    doc.text(`Phone: ${phone}`, 20, 60)
    doc.text(`Address: ${address}`, 20, 70)
    doc.text(`ID: ${idType} - ${idNumber}`, 20, 80)

    doc.text("Incident Details:", 20, 100)
    doc.text(`Date: ${incidentDate}`, 20, 110)
    doc.text(`Time: ${incidentTime}`, 20, 120)
    doc.text(`Location: ${incidentLocation}`, 20, 130)
    doc.text(`Type: ${incidentType}`, 20, 140)
    doc.text(`Description: ${incidentDescription}`, 20, 150)
    doc.text(`Witnesses: ${witnesses}`, 20, 160)

    return doc.output("blob")
  }

  const handleUpload = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const pdfBlob = generatePdf()
      const formData = new FormData()
      formData.append("file", pdfBlob, "fir.pdf")

      const ipfsRes = await axios.post("http://localhost:3001/upload", formData)
      const contentHash = ipfsRes.data.ipfsHash
      alert(`FIR uploaded to IPFS! Hash: ${contentHash}`)
    } catch (err) {
      console.error("Upload error:", err)
      alert("Failed to upload FIR to IPFS")
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }
  

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Online FIR Filing</h1>
              <p className="text-lg text-muted-foreground">
                File a First Information Report online without visiting the police station
              </p>
            </div>

            <Tabs defaultValue="personal" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="incident">Incident Details</TabsTrigger>
                <TabsTrigger value="review">Review & Submit</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-primary/5 border-b">
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Provide your contact details for the FIR</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      <motion.div variants={item} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="address">Residential Address</Label>
                        <Textarea id="address" placeholder="Enter your full address" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="id-type">ID Proof Type</Label>
                        <RadioGroup defaultValue="aadhar" onValueChange={setIdType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="aadhar" id="aadhar" />
                            <Label htmlFor="aadhar">Aadhar Card</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pan" id="pan" />
                            <Label htmlFor="pan">PAN Card</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="voter" id="voter" />
                            <Label htmlFor="voter">Voter ID</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="passport" id="passport" />
                            <Label htmlFor="passport">Passport</Label>
                          </div>
                        </RadioGroup>
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="id-number">ID Number</Label>
                        <Input id="id-number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} placeholder="Enter your ID Number" />
                      </motion.div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-end bg-primary/5 border-t">
                    <Button onClick={() => setActiveTab("incident")} className="btn-blue-gradient">
                      Next: Incident Details
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="incident">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-primary/5 border-b">
                    <CardTitle>Incident Details</CardTitle>
                    <CardDescription>Provide information about the incident</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="incident-date">Date of Incident</Label>
                        <Input id="incident-date" type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="incident-time">Time of Incident</Label>
                        <Input id="incident-time" type="time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="incident-location">Location of Incident</Label>
                        <Input id="incident-location" value={incidentLocation} onChange={(e) => setIncidentLocation(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="incident-description">Detailed Description</Label>
                        <Textarea id="incident-description" value={incidentDescription} onChange={(e) => setIncidentDescription(e.target.value)} />
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label>Type of Incident</Label>
                        <RadioGroup defaultValue="theft" onValueChange={setIncidentType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="theft" id="theft" />
                            <Label htmlFor="theft">Theft/Robbery</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="assault" id="assault" />
                            <Label htmlFor="assault">Assault/Battery</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fraud" id="fraud" />
                            <Label htmlFor="fraud">Fraud/Cheating</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="property" id="property" />
                            <Label htmlFor="property">Property Dispute</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cybercrime" id="cybercrime" />
                            <Label htmlFor="cybercrime">Cybercrime</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="witnesses">Witnesses (if any)</Label>
                        <Textarea id="witnesses" value={witnesses} onChange={(e) => setWitnesses(e.target.value)} placeholder="Enter names and contact details of witnesses"/>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-primary/5 border-t">
                    <Button variant="outline" onClick={() => setActiveTab("personal")} className="btn-outline-gradient">
                      Back
                    </Button>
                    <Button onClick={() => setActiveTab("review")} className="btn-blue-gradient">
                      Next: Review
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="review">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-primary/5 border-b">
                    <CardTitle>Review & Submit</CardTitle>
                    <CardDescription>Review your information before final submission</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                      <motion.div variants={item}>
                        <h3 className="font-semibold mb-2">Personal Information</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p>Name: John Doe</p>
                          <p>Contact: johndoe@example.com | +91 98765 43210</p>
                          <p>Address: 123 Main Street, New Delhi</p>
                          <p>ID: Aadhar Card - XXXX XXXX XXXX</p>
                        </div>
                      </motion.div>

                      <motion.div variants={item}>
                        <h3 className="font-semibold mb-2">Incident Details</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <p>Date & Time: 15 March 2023, 14:30</p>
                          <p>Location: Central Market, Lajpat Nagar</p>
                          <p>Type: Theft/Robbery</p>
                          <p>Description: My wallet was stolen while shopping at the market...</p>
                        </div>
                      </motion.div>

                      <motion.div variants={item} className="space-y-2">
                        <Label htmlFor="declaration">Declaration</Label>
                        <div className="flex items-start space-x-2">
                          <input type="checkbox" id="declaration" className="mt-1" />
                          <Label htmlFor="declaration" className="font-normal text-sm">
                            I hereby declare that the information provided by me is true to the best of my knowledge and
                            belief. I understand that filing a false FIR is punishable under the law.
                          </Label>
                        </div>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-primary/5 border-t">
                    <Button variant="outline" onClick={() => setActiveTab("incident")} className="btn-outline-gradient">
                      Back
                    </Button>
                    <Button className="btn-blue-gradient" onClick={handleUpload}>
                      Submit FIR
                    </Button>

                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <motion.div
              className="mt-12 bg-muted p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Important Information</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Filing a false FIR is a punishable offense under Section 182 of IPC</li>
                <li>You will receive a confirmation email with your FIR number after submission</li>
                <li>You may be contacted by the police for additional information</li>
                <li>For emergency situations, please call 100 immediately</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatbotButton />
    </div>
  )
}

