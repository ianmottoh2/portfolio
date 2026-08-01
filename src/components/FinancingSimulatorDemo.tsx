import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign, Calendar, Shield, Percent, Sparkles, Car, Bike, ArrowRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const FinancingSimulatorDemo: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle'>('car');
  const [vehiclePrice, setVehiclePrice] = useState<number>(250000000); // 250M IDR default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20% DP
  const [tenureMonths, setTenureMonths] = useState<number>(36); // 36 months default
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);

  // Interest rates vary by vehicle type and tenure
  const baseInterestRate = useMemo(() => {
    const rateMap: Record<number, number> = {
      12: vehicleType === 'car' ? 4.5 : 8.0,
      24: vehicleType === 'car' ? 5.2 : 9.5,
      36: vehicleType === 'car' ? 6.0 : 11.0,
      48: vehicleType === 'car' ? 6.8 : 12.5,
      60: vehicleType === 'car' ? 7.5 : 14.0,
    };
    return rateMap[tenureMonths] || 6.0;
  }, [vehicleType, tenureMonths]);

  // Financial calculations
  const downPaymentAmount = (vehiclePrice * downPaymentPercent) / 100;
  const loanPrincipal = vehiclePrice - downPaymentAmount;
  const totalYears = tenureMonths / 12;
  const totalInterestAmount = loanPrincipal * (baseInterestRate / 100) * totalYears;
  const totalLoanAmount = loanPrincipal + totalInterestAmount;
  const rawMonthlyInstallment = totalLoanAmount / tenureMonths;

  // Insurance estimate
  const insuranceFee = includeInsurance ? vehiclePrice * 0.02 * totalYears : 0;
  const adminFee = vehicleType === 'car' ? 1500000 : 500000;
  
  const monthlyInstallment = Math.round(rawMonthlyInstallment + (insuranceFee / tenureMonths));
  const totalFirstPayment = Math.round(downPaymentAmount + adminFee + monthlyInstallment);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <GlassCard className="border border-cyan-500/30 bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-cyan-500/5">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-semibold text-cyan-300 border border-cyan-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Portfolio Demo</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-6 h-6 text-cyan-400" />
            Adira Vehicle Financing Simulator
          </h3>
          <p className="text-xs sm:text-sm text-white/70 mt-1">
            Demo of the interactive financing engine built for momotor.id & momobil.id, enabling 40+ monthly users to compute installment plans.
          </p>
        </div>

        {/* Vehicle Type Switcher */}
        <div className="flex items-center p-1 rounded-2xl glass-panel border border-white/15 shrink-0">
          <button
            onClick={() => {
              setVehicleType('car');
              setVehiclePrice(250000000);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              vehicleType === 'car'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Car Financing</span>
          </button>
          <button
            onClick={() => {
              setVehicleType('motorcycle');
              setVehiclePrice(35000000);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              vehicleType === 'motorcycle'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Motorcycle</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vehicle Price Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white/80">Vehicle Price (OTR)</span>
              <span className="text-cyan-300 font-mono text-sm sm:text-base font-bold">
                {formatIDR(vehiclePrice)}
              </span>
            </div>
            <input
              type="range"
              min={vehicleType === 'car' ? 80000000 : 12000000}
              max={vehicleType === 'car' ? 800000000 : 150000000}
              step={vehicleType === 'car' ? 5000000 : 1000000}
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-white/40">
              <span>{formatIDR(vehicleType === 'car' ? 80000000 : 12000000)}</span>
              <span>{formatIDR(vehicleType === 'car' ? 800000000 : 150000000)}</span>
            </div>
          </div>

          {/* Down Payment (DP) Options */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white/80">Down Payment (DP)</span>
              <span className="text-cyan-300 font-mono font-bold">
                {downPaymentPercent}% ({formatIDR(downPaymentAmount)})
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[15, 20, 25, 30, 40].map((dp) => (
                <button
                  key={dp}
                  onClick={() => setDownPaymentPercent(dp)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    downPaymentPercent === dp
                      ? 'glass-pill-active border-cyan-400'
                      : 'glass-panel text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  {dp}%
                </button>
              ))}
            </div>
          </div>

          {/* Tenure Duration Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white/80">Tenure Duration</span>
              <span className="text-cyan-300 font-mono font-bold">
                {tenureMonths} Months ({tenureMonths / 12} Years)
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setTenureMonths(m)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    tenureMonths === m
                      ? 'glass-pill-active border-cyan-400'
                      : 'glass-panel text-white/70 hover:text-white border-white/10'
                  }`}
                >
                  {m} mos
                </button>
              ))}
            </div>
          </div>

          {/* Insurance Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-bold text-white">Comprehensive Protection Insurance</div>
                <div className="text-[10px] text-white/60">Include total loss & accident protection</div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeInsurance}
              onChange={(e) => setIncludeInsurance(e.target.checked)}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Result Display Panel */}
        <div className="lg:col-span-5">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-400/40 bg-gradient-to-b from-cyan-500/10 via-white/[0.04] to-violet-500/10 shadow-2xl relative overflow-hidden space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
                Estimated Monthly Installment
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                {formatIDR(monthlyInstallment)}
                <span className="text-xs text-white/60 font-sans font-normal"> / month</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs text-white/80">
              <div className="flex justify-between">
                <span className="text-white/60">Effective Interest Rate:</span>
                <span className="font-mono font-bold text-cyan-300">{baseInterestRate}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Loan Principal:</span>
                <span className="font-mono">{formatIDR(loanPrincipal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Total Interest Amount:</span>
                <span className="font-mono">{formatIDR(totalInterestAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Estimated First TDP Payment:</span>
                <span className="font-mono font-bold text-emerald-400">{formatIDR(totalFirstPayment)}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 text-[11px] text-cyan-200 leading-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-cyan-300" />
              <span>Real-time calculation logic executed directly on client/edge with zero network latency.</span>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
