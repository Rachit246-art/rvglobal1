import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, ChevronRight, Calendar, Users, MapPin, Plane, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string | React.ReactNode;
  timestamp: Date;
}

interface UserData {
  charterType?: string;
  tripType?: string;
  departure?: string;
  destination?: string;
  date?: string;
  time?: string;
  passengers?: string;
  purpose?: string;
  aircraft?: string;
  additionalServices?: string[];
  experience?: string;
  fullName?: string;
  mobile?: string;
  email?: string;
  company?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage("Welcome to RV Global Aviation. We specialize in premium private jet, helicopter, and international charter services for business leaders, VIP travelers, leisure trips, and urgent aviation requirements.\n\nHow may we assist you today?");
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendBotMessage = (content: string | React.ReactNode) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'bot',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleUserChoice = (choice: string, value?: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: choice,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    
    if (choice === 'Speak to Aviation Expert') {
      window.open('https://wa.me/918904886662', '_blank');
      return;
    }
    
    const nextStep = step + 1;
    setStep(nextStep);

    // Update user data
    const updatedData = { ...userData };
    const val = value || choice;

    switch (step) {
      case 0: updatedData.charterType = val; break;
      case 1: updatedData.tripType = val; break;
      case 5: updatedData.time = val; break;
      case 6: updatedData.passengers = val; break;
      case 7: updatedData.purpose = val; break;
      case 8: updatedData.aircraft = val; break;
      case 9: 
        if (!updatedData.additionalServices) updatedData.additionalServices = [];
        updatedData.additionalServices.push(val); 
        break;
      case 10: updatedData.experience = val; break;
    }
    setUserData(updatedData);

    // Trigger next bot message based on step
    setTimeout(() => triggerNextStep(nextStep, updatedData), 500);
  };

  const handleTextInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    
    const nextStep = step + 1;
    setStep(nextStep);

    const updatedData = { ...userData };
    if (step === 2) updatedData.departure = inputValue;
    if (step === 3) updatedData.destination = inputValue;
    if (step === 4) updatedData.date = inputValue;
    
    setUserData(updatedData);
    setInputValue('');

    setTimeout(() => triggerNextStep(nextStep, updatedData), 500);
  };

  const handleLeadCapture = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = {
      ...userData,
      fullName: formData.get('fullName') as string,
      mobile: formData.get('mobile') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
    };
    setUserData(updatedData);
    
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: `Submitted details for ${updatedData.fullName}`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    const nextStep = 12;
    setStep(nextStep);
    setTimeout(() => triggerNextStep(nextStep, updatedData), 500);
  };

  const triggerNextStep = (currentStep: number, data: UserData) => {
    switch (currentStep) {
      case 1:
        sendBotMessage("Please select your travel requirement.");
        break;
      case 2:
        sendBotMessage("Please enter your departure city or airport.");
        break;
      case 3:
        sendBotMessage("Please enter your destination city or airport.");
        break;
      case 4:
        sendBotMessage("When would you like to fly?");
        break;
      case 5:
        sendBotMessage("Please select your preferred departure timing.");
        break;
      case 6:
        sendBotMessage("How many passengers will be traveling?");
        break;
      case 7:
        sendBotMessage("Please select the purpose of your charter.");
        break;
      case 8:
        sendBotMessage("Do you have a preferred aircraft category?");
        break;
      case 9:
        sendBotMessage("Would you require any additional premium services?");
        break;
      case 10:
        sendBotMessage("Please select your preferred charter experience.");
        break;
      case 11:
        sendBotMessage("Please share your details so our aviation specialist can prepare aircraft availability and charter quotations.");
        break;
      case 12:
        sendBotMessage(
          <div className="space-y-2">
            <p className="font-bold">Thank you for choosing RV Global Aviation.</p>
            <p>Your charter request has been successfully submitted. Our aviation specialist will contact you shortly with suitable aircraft options, availability, and estimated charter pricing.</p>
            <p className="text-sm italic">For urgent departures, our team prioritizes immediate assistance.</p>
          </div>
        );
        break;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {['Domestic Charter', 'International Charter', 'Helicopter Charter', 'Corporate Travel', 'Pilgrimage Charter', 'Emergency Charter', 'Speak to Aviation Expert'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {['One Way', 'Round Trip', 'Multi-City', 'Same Day Return', 'Urgent Departure'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 2:
      case 3:
        return (
          <form onSubmit={handleTextInput} className="mt-4 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step === 2 ? "e.g. New York" : "e.g. London"}
              className="chat-input flex-1"
              autoFocus
            />
            <button type="submit" className="send-btn"><Send size={18} /></button>
          </form>
        );
      case 4:
        return (
          <form onSubmit={handleTextInput} className="mt-4 flex gap-2">
            <input 
              type="date" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="chat-input flex-1"
              autoFocus
            />
            <button type="submit" className="send-btn"><Send size={18} /></button>
          </form>
        );
      case 5:
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Early Morning', 'Morning', 'Afternoon', 'Evening', 'Flexible Timing'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['1-3 Passengers', '4-6 Passengers', '7-10 Passengers', '10+ Passengers'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {['Business Travel', 'Leisure / Family', 'Religious Trip', 'Wedding / Event', 'Medical Emergency', 'VIP Movement', 'Corporate Team Travel'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 8:
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Light Jet', 'Mid-Size Jet', 'Heavy Jet', 'Turbo Prop', 'Helicopter', 'Suggest Best Option'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 9:
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {['Luxury Ground Transfer', 'In-Flight Catering', 'Hotel Assistance', 'Visa Assistance', 'Concierge Services', 'Fast Track Airport Assistance', 'No Additional Services'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 10:
        return (
          <div className="grid grid-cols-1 gap-2 mt-4">
            {['Most Efficient Option', 'Premium Comfort', 'Ultra Luxury Experience'].map((opt) => (
              <button key={opt} onClick={() => handleUserChoice(opt)} className="choice-btn">{opt}</button>
            ))}
          </div>
        );
      case 11:
        return (
          <form onSubmit={handleLeadCapture} className="mt-4 space-y-3">
            <input required name="fullName" type="text" placeholder="Full Name" className="chat-input w-full" />
            <input required name="mobile" type="tel" placeholder="Mobile Number" className="chat-input w-full" />
            <input required name="email" type="email" placeholder="Email Address" className="chat-input w-full" />
            <input name="company" type="text" placeholder="Company Name (Optional)" className="chat-input w-full" />
            <button type="submit" className="submit-btn w-full">Get Charter Quote</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[600px] bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Plane size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">RV Global Aviation</h3>
                  <p className="text-[10px] text-white/70">Online | Aviation Expert</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10, y: 5 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.type === 'bot' 
                      ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none shadow-md'
                  }`}>
                    {msg.content}
                    <div className={`text-[9px] mt-1 opacity-50 ${msg.type === 'bot' ? 'text-left' : 'text-right'}`}>
                      {format(msg.timestamp, 'HH:mm')}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
              
              {/* Active Step Content */}
              {step < 12 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {renderStepContent()}
                </motion.div>
              )}
            </div>
            
            {/* Footer Status */}
            <div className="p-2 px-4 bg-slate-50/50 text-[10px] text-slate-400 flex items-center gap-2 border-t border-slate-100">
              <ShieldCheck size={12} />
              <span>Secure aviation inquiry platform</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-accent/20 animate-ping rounded-full group-hover:hidden"></div>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

    </div>
  );
};

export default Chatbot;
