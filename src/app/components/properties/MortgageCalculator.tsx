import { useState, useEffect } from "react";
import { Calculator, DollarSign, Home, TrendingUp, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface MortgageResults {
  monthlyPayment: number;
  totalAmount: number;
  interestRate: number;
  term: number;
  downPayment: number;
  loanAmount: number;
  totalInterest: number;
  monthlyInsurance: number;
  monthlyTax: number;
  totalMonthlyPayment: number;
}

interface MortgageCalculatorProps {
  propertyPrice?: number;
  currency?: "USD" | "UYU";
}

export default function MortgageCalculator({ propertyPrice = 500000, currency = "USD" }: MortgageCalculatorProps) {
  const [monthlyPayment, setMonthlyPayment] = useState<string>("");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [results, setResults] = useState<MortgageResults[]>([]);
  const [selectedResult, setSelectedResult] = useState<MortgageResults | null>(null);

  // Tasas de interés simuladas para Uruguay (anual)
  const interestRates = {
    10: 7.5,   // 10 años: 7.5% anual
    15: 8.0,   // 15 años: 8.0% anual
    20: 8.5,   // 20 años: 8.5% anual
    25: 9.0,   // 25 años: 9.0% anual
    30: 9.5,   // 30 años: 9.5% anual
  };

  // Costos adicionales mensuales (simulados)
  const monthlyCosts = {
    insurance: propertyPrice * 0.0005, // 0.05% del valor de la propiedad mensual
    tax: propertyPrice * 0.0008,      // 0.08% del valor de la propiedad mensual
  };

  const calculateMortgage = () => {
    if (!monthlyPayment || parseFloat(monthlyPayment) <= 0) {
      setResults([]);
      setSelectedResult(null);
      return;
    }

    const maxMonthlyPayment = parseFloat(monthlyPayment);
    const downPayment = propertyPrice * (parseFloat(downPaymentPercent) / 100);
    const maxLoanAmount = propertyPrice - downPayment;
    
    const calculatedResults: MortgageResults[] = [];

    // Calcular para cada plazo
    Object.entries(interestRates).forEach(([years, annualRate]) => {
      const term = parseInt(years);
      const monthlyRate = annualRate / 100 / 12;
      const numPayments = term * 12;
      
      // Fórmula de amortización: P = L[r(1+r)^n]/[(1+r)^n-1]
      // Donde: P = pago mensual, L = monto del préstamo, r = tasa mensual, n = número de pagos
      const maxPayment = maxMonthlyPayment - monthlyCosts.insurance - monthlyCosts.tax;
      
      if (maxPayment > 0 && monthlyRate > 0) {
        const maxLoanFromPayment = (maxPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) / 
                                  (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
        
        const actualLoanAmount = Math.min(maxLoanAmount, maxLoanFromPayment);
        
        if (actualLoanAmount > 0) {
          const actualMonthlyPayment = (actualLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                     (Math.pow(1 + monthlyRate, numPayments) - 1);
          
          const totalInterest = (actualMonthlyPayment * numPayments) - actualLoanAmount;
          const totalAmount = actualLoanAmount + downPayment;
          
          calculatedResults.push({
            monthlyPayment: actualMonthlyPayment + monthlyCosts.insurance + monthlyCosts.tax,
            totalAmount,
            interestRate: annualRate,
            term,
            downPayment,
            loanAmount: actualLoanAmount,
            totalInterest,
            monthlyInsurance: monthlyCosts.insurance,
            monthlyTax: monthlyCosts.tax,
            totalMonthlyPayment: actualMonthlyPayment,
          });
        }
      }
    });

    // Ordenar por monto total de crédito (mayor a menor)
    calculatedResults.sort((a, b) => b.totalAmount - a.totalAmount);
    
    setResults(calculatedResults);
    setSelectedResult(calculatedResults[0] || null);
  };

  useEffect(() => {
    calculateMortgage();
  }, [monthlyPayment, downPaymentPercent, propertyPrice]);

  const formatCurrency = (amount: number) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    } else {
      return `$${amount.toLocaleString('es-UY', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#8B5CF6]/20 rounded-lg">
          <Calculator className="w-5 h-5 text-[#8B5CF6]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#F8FAFC]">Calculadora de Hipotecas</h3>
          <p className="text-sm text-[#94A3B8]">Simulá tu crédito hipotecario en Uruguay</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
            ¿Cuánto podés pagar por mes?
          </Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8] w-4 h-4" />
            <Input
              type="number"
              placeholder="Ej: 1500"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              className="pl-10 bg-[#0F172A] border-[#334155] text-[#F8FAFC] placeholder-[#64748B]"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-[#CBD5E1] mb-2 block">
            Cuota Inicial
          </Label>
          <Select value={downPaymentPercent} onValueChange={setDownPaymentPercent}>
            <SelectTrigger className="bg-[#0F172A] border-[#334155] text-[#F8FAFC]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1E293B] border-[#334155]">
              <SelectItem value="10" className="text-[#F8FAFC]">10%</SelectItem>
              <SelectItem value="20" className="text-[#F8FAFC]">20%</SelectItem>
              <SelectItem value="30" className="text-[#F8FAFC]">30%</SelectItem>
              <SelectItem value="40" className="text-[#F8FAFC]">40%</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-[#0F172A] rounded-xl p-4 mb-6 border border-[#334155]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-sm text-[#94A3B8]">Valor de la propiedad</span>
          </div>
          <span className="text-lg font-semibold text-[#F8FAFC]">
            {formatCurrency(propertyPrice)}
          </span>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && selectedResult && (
        <div className="space-y-6">
          {/* Selected Result */}
          <div className="bg-gradient-to-r from-[#8B5CF6]/10 to-[#3B82F6]/10 rounded-xl p-6 border border-[#8B5CF6]/20">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-[#F8FAFC]">Mejor Opción</h4>
              <div className="flex items-center gap-1 text-sm text-[#8B5CF6]">
                <TrendingUp className="w-4 h-4" />
                {selectedResult.term} años
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Crédito Total */}
              <div className="bg-[#0F172A] rounded-lg p-4 border border-[#334155]">
                <div className="text-sm text-[#94A3B8] mb-1">Crédito Total</div>
                <div className="text-xl font-bold text-[#F8FAFC] break-words">
                  {formatCurrency(selectedResult.totalAmount)}
                </div>
              </div>
              
              {/* Cuota Mensual */}
              <div className="bg-[#0F172A] rounded-lg p-4 border border-[#334155]">
                <div className="text-sm text-[#94A3B8] mb-1">Cuota Mensual</div>
                <div className="text-xl font-bold text-[#8B5CF6] break-words">
                  {formatCurrency(selectedResult.monthlyPayment)}
                </div>
              </div>
              
              {/* Tasa de Interés */}
              <div className="bg-[#0F172A] rounded-lg p-4 border border-[#334155]">
                <div className="text-sm text-[#94A3B8] mb-1">Tasa de Interés</div>
                <div className="text-xl font-bold text-[#F8FAFC]">
                  {formatPercent(selectedResult.interestRate)}
                </div>
              </div>
              
              {/* Intereses Totales */}
              <div className="bg-[#06B6D4]/20 rounded-lg p-4 border border-[#06B6D4]/30">
                <div className="text-sm text-[#94A3B8] mb-1">Intereses Totales</div>
                <div className="text-xl font-bold text-[#06B6D4] break-words">
                  {formatCurrency(selectedResult.totalInterest)}
                </div>
              </div>
            </div>
          </div>

          {/* All Results */}
          <div>
            <h4 className="text-lg font-semibold text-[#F8FAFC] mb-4">Otras Opciones</h4>
            <div className="space-y-3">
              {results.slice(1).map((result, index) => (
                <div
                  key={index}
                  className="bg-[#0F172A] rounded-lg p-4 border border-[#334155] hover:border-[#8B5CF6]/50 transition-all cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="text-center px-3 py-1 bg-[#8B5CF6]/20 rounded">
                        <div className="font-semibold text-[#8B5CF6]">{result.term} años</div>
                      </div>
                      <div className="text-sm text-[#94A3B8]">Tasa: {formatPercent(result.interestRate)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#1E293B] rounded p-3">
                      <div className="text-sm text-[#94A3B8] mb-1">Crédito Total</div>
                      <div className="font-semibold text-[#F8FAFC] break-words">
                        {formatCurrency(result.totalAmount)}
                      </div>
                    </div>
                    <div className="bg-[#1E293B] rounded p-3">
                      <div className="text-sm text-[#94A3B8] mb-1">Cuota Mensual</div>
                      <div className="font-semibold text-[#8B5CF6] break-words">
                        {formatCurrency(result.monthlyPayment)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Breakdown */}
          {selectedResult && (
            <div className="bg-[#0F172A] rounded-xl p-6 border border-[#334155]">
              <h4 className="text-lg font-semibold text-[#F8FAFC] mb-4">Desglose Detallado</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Valor de la propiedad:</span>
                  <span className="text-[#F8FAFC] font-medium">{formatCurrency(propertyPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Cuota inicial ({downPaymentPercent}%):</span>
                  <span className="text-[#F8FAFC] font-medium">{formatCurrency(selectedResult.downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Monto del préstamo:</span>
                  <span className="text-[#F8FAFC] font-medium">{formatCurrency(selectedResult.loanAmount)}</span>
                </div>
                <div className="border-t border-[#334155] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Cuota del préstamo:</span>
                    <span className="text-[#F8FAFC] font-medium">{formatCurrency(selectedResult.totalMonthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Seguro mensual:</span>
                    <span className="text-[#F8FAFC] font-medium">{formatCurrency(selectedResult.monthlyInsurance)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Impuestos mensuales:</span>
                    <span className="text-[#F8FAFC] font-medium">{formatCurrency(selectedResult.monthlyTax)}</span>
                  </div>
                  <div className="border-t border-[#334155] pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-[#F8FAFC] font-semibold">Cuota mensual total:</span>
                      <span className="text-[#8B5CF6] font-bold text-lg">{formatCurrency(selectedResult.monthlyPayment)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-[#334155] pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-[#94A3B8]">Total de intereses:</span>
                    <span className="text-[#94A3B8] font-medium">{formatCurrency(selectedResult.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#F8FAFC] font-semibold">Total a pagar:</span>
                    <span className="text-[#8B5CF6] font-bold">{formatCurrency(selectedResult.loanAmount + selectedResult.totalInterest)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#8B5CF6] mt-0.5" />
              <div className="text-sm text-[#CBD5E1]">
                <strong>Importante:</strong> Esta es una simulación basada en tasas de interés aproximadas para el mercado uruguayo. 
                Las condiciones finales pueden variar según la institución financiera, tu perfil crediticio y las condiciones específicas del préstamo.
              </div>
            </div>
          </div>
        </div>
      )}

      {results.length === 0 && monthlyPayment && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4"> Calculator </div>
          <p className="text-[#94A3B8]">
            Ingresá un monto mensual para ver las opciones de crédito disponibles.
          </p>
        </div>
      )}
    </div>
  );
}
