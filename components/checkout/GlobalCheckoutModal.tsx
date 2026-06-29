'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2, Check } from 'lucide-react';
import { checkoutSchema, type CheckoutPayload } from '@/lib/validations';
import { useRouter } from 'next/navigation';

export default function GlobalCheckoutModal() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<CheckoutPayload>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      role: '',
      passType: 'standard',
      paymentMethod: 'paypal',
    },
  });

  // Listen to hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#register') {
        setOpen(true);
        // Clean up hash so it can be triggered again
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    // Check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen for custom open events if needed from other components
  React.useEffect(() => {
    const handleOpenCheckout = () => setOpen(true);
    window.addEventListener('open-checkout', handleOpenCheckout);
    return () => window.removeEventListener('open-checkout', handleOpenCheckout);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setStep(1);
        form.reset();
        setError(null);
      }, 300);
    }
  };

  const onNextStep = async () => {
    const valid = await form.trigger();
    if (valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: CheckoutPayload) => {
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

  const passType = form.watch('passType');
  const paymentMethod = form.watch('paymentMethod');
  const price = passType === 'standard' ? 599 : 999;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-800 bg-slate-900 p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl">
          
          {/* Header */}
          <div className="flex flex-col space-y-1.5 p-6 pb-4 border-b border-white/5 relative">
            <DialogPrimitive.Title className="text-xl font-bold font-display text-white">
              Secure Registration
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-sm text-slate-400">
              {step === 1 ? 'Step 1 of 2: Attendee Details' : 'Step 2 of 2: Order Review'}
            </DialogPrimitive.Description>
            <DialogPrimitive.Close className="absolute right-6 top-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-slate-800 data-[state=open]:text-slate-400 text-slate-400 hover:bg-white/10 p-1">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div className="p-6 pt-2">
            {error && (
              <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                  {/* Pass Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <label
                      className={`cursor-pointer rounded-xl border p-4 flex flex-col gap-1 transition-all ${
                        passType === 'standard'
                          ? 'border-brand-400 bg-brand-400/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        value="standard"
                        className="sr-only"
                        {...form.register('passType')}
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-white">Standard</span>
                        {passType === 'standard' && <Check className="w-4 h-4 text-brand-400" />}
                      </div>
                      <span className="text-2xl font-bold text-white mt-2">$599</span>
                      <span className="text-xs text-slate-400 mt-1">Full summit access</span>
                    </label>

                    <label
                      className={`cursor-pointer rounded-xl border p-4 flex flex-col gap-1 transition-all ${
                        passType === 'vip'
                          ? 'border-brand-400 bg-brand-400/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <input
                        type="radio"
                        value="vip"
                        className="sr-only"
                        {...form.register('passType')}
                      />
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold text-white">VIP</span>
                        {passType === 'vip' && <Check className="w-4 h-4 text-brand-400" />}
                      </div>
                      <span className="text-2xl font-bold text-white mt-2">$999</span>
                      <span className="text-xs text-slate-400 mt-1">Gala + Priority Access</span>
                    </label>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none text-slate-300">
                        Full Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Jane Doe"
                        {...form.register('name')}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-red-400">{form.formState.errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none text-slate-300">
                        Work Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="jane@company.com"
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium leading-none text-slate-300">
                          Company
                        </label>
                        <input
                          id="company"
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Acme Inc"
                          {...form.register('company')}
                        />
                        {form.formState.errors.company && (
                          <p className="text-sm text-red-400">{form.formState.errors.company.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="role" className="text-sm font-medium leading-none text-slate-300">
                          Job Title
                        </label>
                        <input
                          id="role"
                          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Director of AI"
                          {...form.register('role')}
                        />
                        {form.formState.errors.role && (
                          <p className="text-sm text-red-400">{form.formState.errors.role.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="rounded-xl border border-white/10 bg-slate-800/50 p-4 space-y-4">
                    <h4 className="font-semibold text-white border-b border-white/5 pb-2">Order Summary</h4>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Pass Type</span>
                      <span className="font-medium text-white capitalize">{form.getValues('passType')} Registration</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Attendee</span>
                      <span className="font-medium text-white">{form.getValues('name')}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Company</span>
                      <span className="font-medium text-white">{form.getValues('company')}</span>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <span className="text-slate-300 font-medium">Total (GBP)</span>
                      <span className="text-2xl font-bold text-white">£{price}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-white text-sm">Select Payment Method</h4>
                    
                    <div className="grid gap-3">
                      <label
                        className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-brand-400 bg-brand-400/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          value="paypal"
                          className="sr-only"
                          {...form.register('paymentMethod')}
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-brand-400' : 'border-slate-500'}`}>
                          {paymentMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-brand-400" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-white block">Credit Card / PayPal</span>
                          <span className="text-xs text-slate-400">Pay securely via PayPal</span>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                          paymentMethod === 'bank_transfer'
                            ? 'border-brand-400 bg-brand-400/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          value="bank_transfer"
                          className="sr-only"
                          {...form.register('paymentMethod')}
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-brand-400' : 'border-slate-500'}`}>
                          {paymentMethod === 'bank_transfer' && <div className="w-2 h-2 rounded-full bg-brand-400" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-white block">Bank Transfer</span>
                          <span className="text-xs text-slate-400">Offline wire transfer instructions</span>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${
                          paymentMethod === 'whatsapp'
                            ? 'border-brand-400 bg-brand-400/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          value="whatsapp"
                          className="sr-only"
                          {...form.register('paymentMethod')}
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'whatsapp' ? 'border-brand-400' : 'border-slate-500'}`}>
                          {paymentMethod === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-brand-400" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-white block">Talk to Representative</span>
                          <span className="text-xs text-slate-400">Book tickets via WhatsApp (+92 333 2230665)</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <p className="text-xs text-slate-500 text-center">
                    {paymentMethod === 'paypal' && 'You will be redirected to PayPal to complete your payment.'}
                    {paymentMethod === 'bank_transfer' && 'We will provide bank details to complete your transfer.'}
                    {paymentMethod === 'whatsapp' && 'You will be redirected to WhatsApp to speak with our team.'}
                  </p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex justify-between pt-6 border-t border-white/5">
                {step === 1 ? (
                  <>
                    <DialogPrimitive.Close className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                      Cancel
                    </DialogPrimitive.Close>
                    <button
                      type="button"
                      onClick={onNextStep}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-brand-400 px-8 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-brand-300"
                    >
                      Continue
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
                      className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex h-10 items-center justify-center rounded-md bg-brand-400 px-8 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-brand-300 disabled:opacity-50 min-w-[140px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        paymentMethod === 'paypal' ? 'Proceed to PayPal' :
                        paymentMethod === 'whatsapp' ? 'Continue to WhatsApp' :
                        'Confirm Booking'
                      )}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
