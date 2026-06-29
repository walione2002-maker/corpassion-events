import Link from 'next/link';
import { CheckCircle, Landmark, MessageSquare } from 'lucide-react';

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { method?: string; ref?: string; amount?: string; session_id?: string; mock?: string };
}) {
  const method = searchParams.method;
  const isBankTransfer = method === 'bank_transfer';
  const isMockPayPal = searchParams.mock === 'true';

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="text-center">
          {isBankTransfer ? (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-400/20 mb-4">
              <Landmark className="h-8 w-8 text-brand-400" />
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-400/20 mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          )}
          
          <h2 className="mt-2 text-3xl font-display font-bold text-white">
            {isBankTransfer ? 'Registration Pending' : 'Payment Successful!'}
          </h2>
          
          <p className="mt-4 text-sm text-slate-400">
            {isBankTransfer
              ? 'Please complete your bank transfer to confirm your ticket. Your registration details have been saved.'
              : isMockPayPal 
                ? 'Your mock PayPal transaction was successful. (Configure live PayPal keys for real transactions).'
                : 'Thank you for your purchase. We have sent a confirmation email with your ticket details.'}
          </p>
        </div>

        {isBankTransfer && (
          <div className="bg-slate-900 rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-medium text-white border-b border-white/5 pb-2">Wire Transfer Instructions</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference Number</span>
                <span className="font-bold text-brand-400">{searchParams.ref || 'PENDING'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Due</span>
                <span className="font-bold text-white">£{searchParams.amount || '0'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2 text-sm text-slate-300">
              <p><span className="text-slate-500">Bank Name:</span> Example Global Bank</p>
              <p><span className="text-slate-500">Account Name:</span> Corpassion Events Ltd</p>
              <p><span className="text-slate-500">IBAN:</span> GB12 3456 7890 1234 56</p>
              <p><span className="text-slate-500">SWIFT/BIC:</span> EXAMPGB1</p>
            </div>
            
            <p className="text-xs text-brand-400/80 bg-brand-400/10 p-3 rounded-lg mt-4">
              IMPORTANT: Please include your Reference Number ({searchParams.ref}) in the transfer notes so we can match your payment.
            </p>
          </div>
        )}

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-slate-900 bg-brand-400 hover:bg-brand-300 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
