'use client';

import React, { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boothOptions, boothFeatures } from '@/data/events';
import { boothSchema, BoothPayload } from '@/lib/validations';
import { Check, Loader2, ArrowLeft, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function BoothCheckoutPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const booth = boothOptions.find(b => b.id === params.id);
  if (!booth) {
    notFound();
  }

  const form = useForm<BoothPayload>({
    resolver: zodResolver(boothSchema),
    defaultValues: {
      type: 'booth',
      packageId: booth.id,
      company: '',
      contactName: '',
      email: '',
      phone: '',
      industry: '',
      paymentMethod: 'paypal',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = async (data: BoothPayload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to initialize checkout');
      }
      
      if (result.url) {
        router.push(result.url);
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-50 dark:bg-[#0a0a0a] relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link href="/events/dubai-ai-summit-2026#sponsorship" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-500 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Partners
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="p-2 bg-brand-500/10 rounded-lg">
                  <LayoutGrid className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white">Booth Reservation</h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Secure the <span className="font-semibold text-slate-900 dark:text-white">{booth.name}</span> space for your company.</p>
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500 dark:text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Company Information</h3>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company Name</label>
                      <input
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                        placeholder="Acme Corp"
                        {...form.register('company')}
                      />
                      {form.formState.errors.company && <p className="text-xs text-red-500">{form.formState.errors.company.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contact Person Name</label>
                      <input
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                        placeholder="Jane Doe"
                        {...form.register('contactName')}
                      />
                      {form.formState.errors.contactName && <p className="text-xs text-red-500">{form.formState.errors.contactName.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
                      <input
                        type="email"
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                        placeholder="jane@company.com"
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                      <input
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                        placeholder="+1 (555) 000-0000"
                        {...form.register('phone')}
                      />
                      {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Industry (Optional)</label>
                      <input
                        className="flex h-12 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all outline-none"
                        placeholder="e.g. Healthcare, Fintech..."
                        {...form.register('industry')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Payment Method</h3>
                
                <div className="grid gap-4">
                  {[
                    { id: 'paypal', title: 'Credit Card / PayPal', desc: 'Pay securely via PayPal' },
                    { id: 'bank_transfer', title: 'Bank Transfer', desc: 'Offline wire transfer instructions' },
                    { id: 'whatsapp', title: 'Talk to Representative', desc: 'Secure this booth via WhatsApp' }
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-all ${
                        paymentMethod === method.id
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                          : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        value={method.id}
                        className="sr-only"
                        {...form.register('paymentMethod')}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'border-brand-500' : 'border-slate-300 dark:border-slate-600'}`}>
                        {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">{method.title}</span>
                        <span className="text-sm text-slate-500">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 text-white font-semibold py-4 px-8 hover:bg-brand-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-500/30"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  paymentMethod === 'paypal' ? 'Proceed to Secure Checkout' :
                  paymentMethod === 'whatsapp' ? 'Continue on WhatsApp' :
                  'Confirm Reservation'
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Booth Summary</h3>
              
              <div className="border-b border-slate-200 dark:border-white/10 pb-6 mb-6">
                <h4 className="font-display text-xl font-bold text-brand-600 dark:text-brand-400 mb-1">{booth.name}</h4>
                <p className="text-sm text-slate-500 mb-4">{booth.description}</p>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  ${booth.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">What's Included</h4>
                <ul className="space-y-3">
                  {boothFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center font-bold text-slate-900 dark:text-white">
                  <span>Total (USD)</span>
                  <span className="text-xl">${booth.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
