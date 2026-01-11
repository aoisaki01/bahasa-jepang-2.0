import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { characterProfile } from "@/lib/character";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-neutral-950">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
            Gen Z Japanese Learning Companion
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Learn Japanese with <br />
            <span className="text-pink-400">{characterProfile.name}</span>
          </h1>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-lg mx-auto md:mx-0">
            {characterProfile.role}. {characterProfile.description}
            <br />
            Yuriko siap menemani kamu belajar Bahasa Jepang dengan santai!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Link href="/chat">
              <Button size="lg" className="rounded-full text-lg px-8 bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/25 transition-all">
                <MessageCircle className="mr-2 h-5 w-5" /> Start Chatting
              </Button>
            </Link>

          </div>
        </div>

        {/* Right: Character Image */}
        <div className="flex-1 relative">
          <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900 z-10 opacity-20 pointer-events-none" />
            <Image
              src={characterProfile.avatar}
              alt={characterProfile.name}
              fill
              className="object-cover rounded-3xl shadow-2xl shadow-pink-900/20 border border-neutral-800"
              priority
            />
            {/* Floating details */}
            <div className="absolute -bottom-6 -left-6 bg-neutral-900/90 backdrop-blur border border-neutral-800 p-4 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🇯🇵</div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Native</p>
                  <p className="font-bold text-neutral-200">Japanese</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-neutral-900/90 backdrop-blur border border-neutral-800 p-4 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🇮🇩</div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Fluent</p>
                  <p className="font-bold text-neutral-200">Indonesian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
