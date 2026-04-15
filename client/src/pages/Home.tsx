import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Zap, Shield, Cpu, Github, ExternalLink } from "lucide-react";

export default function Home() {
  const [selectedLayer, setSelectedLayer] = useState("data");

  const layers = {
    data: {
      title: "Data Layer",
      icon: Database,
      description: "Ingesting and managing raw market data from various sources",
      components: [
        "Market Data Feeds: Real-time and historical price data (OHLCV) for multiple symbols (ES, NQ, YM)",
        "Data Storage: Efficient storage mechanisms for historical data, enabling backtesting and analysis",
        "Data Normalization: Processes to ensure data consistency and quality across different feeds"
      ],
      color: "from-blue-500 to-blue-600"
    },
    signal: {
      title: "Signal Engine",
      icon: Zap,
      description: "Generates trading signals based on technical analysis and market concepts",
      components: [
        "SMT Detection: Identifies divergences between correlated assets using pivot-based logic",
        "FVG Detection: Identifies price inefficiencies indicating potential areas of interest",
        "MSS Logic: Detects changes in market trend by identifying breaks of swing highs/lows",
        "Displacement Confirmation: Validates signals by confirming strong price movement through key levels"
      ],
      color: "from-yellow-500 to-orange-600"
    },
    validation: {
      title: "Validation Layer",
      icon: Shield,
      description: "Filters and validates generated signals to improve quality and reduce false positives",
      components: [
        "Delta Filters: Analyzes order flow and volume delta to confirm market move strength",
        "Time Filters: Applies time-based constraints (session times, news events) for optimal trading",
        "Contextual Analysis: Incorporates broader market context for filtering low-probability setups"
      ],
      color: "from-green-500 to-emerald-600"
    },
    execution: {
      title: "Execution Layer",
      icon: Cpu,
      description: "Manages placement, modification, and monitoring of trades with a brokerage",
      components: [
        "Webhook Listener: HTTP endpoint receiving signals from Pine Script engine via TradingView alerts",
        "Signal Parser: Interprets webhook data to extract trade parameters (symbol, action, quantity)",
        "IBKR Connection: Establishes connection to Interactive Brokers via ib_insync for order routing",
        "Order Execution: Places market orders based on parsed signals with error management"
      ],
      color: "from-purple-500 to-pink-600"
    }
  };

  const currentLayer = layers[selectedLayer as keyof typeof layers];
  const CurrentIcon = currentLayer.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Trading Automation System</h1>
              <p className="text-slate-400 mt-1">Interactive Architecture Guide for Traders</p>
            </div>
            <a
              href="https://github.com/maitethialeakey-droid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Overview Section */}
        <section className="mb-16">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-white mb-4">System Architecture Overview</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              This trading automation system is built on four interconnected layers, each responsible for a critical aspect of the trading pipeline. From data ingestion to order execution, explore how market signals are generated, validated, and executed in real-time.
            </p>
          </div>
        </section>

        {/* Layer Selection Tabs */}
        <section className="mb-16">
          <Tabs value={selectedLayer} onValueChange={setSelectedLayer} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700 p-1">
              {Object.entries(layers).map(([key, layer]) => {
                const Icon = layer.icon;
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{layer.title.split(" ")[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(layers).map(([key, layer]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Layer Card */}
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl text-white">{layer.title}</CardTitle>
                          <CardDescription className="text-slate-400 mt-2">{layer.description}</CardDescription>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${layer.color}`}>
                          <CurrentIcon className="text-white" size={24} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {layer.components.map((component, idx) => (
                          <div key={idx} className="flex gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                              <span className="text-xs font-semibold text-slate-300">{idx + 1}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{component}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Architecture Diagram */}
                  <div className="flex flex-col justify-center">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
                      <h3 className="text-lg font-semibold text-white mb-6">Data Flow</h3>
                      <div className="space-y-4">
                        {selectedLayer === "data" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                              <p className="text-blue-300 font-semibold">Market Data Feeds</p>
                              <p className="text-slate-400 text-sm mt-1">ES, NQ, YM symbols</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                              <p className="text-blue-300 font-semibold">Data Storage</p>
                              <p className="text-slate-400 text-sm mt-1">Historical & Real-time</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                              <p className="text-blue-300 font-semibold">Normalized Output</p>
                              <p className="text-slate-400 text-sm mt-1">Consistent format</p>
                            </div>
                          </div>
                        )}
                        {selectedLayer === "signal" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <p className="text-yellow-300 font-semibold">Pivot Detection</p>
                              <p className="text-slate-400 text-sm mt-1">Non-repainting logic</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <p className="text-yellow-300 font-semibold">Signal Generation</p>
                              <p className="text-slate-400 text-sm mt-1">SMT, FVG, MSS</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <p className="text-yellow-300 font-semibold">Signal Output</p>
                              <p className="text-slate-400 text-sm mt-1">LONG/SHORT triggers</p>
                            </div>
                          </div>
                        )}
                        {selectedLayer === "validation" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <p className="text-green-300 font-semibold">Signal Input</p>
                              <p className="text-slate-400 text-sm mt-1">From Signal Engine</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <p className="text-green-300 font-semibold">Apply Filters</p>
                              <p className="text-slate-400 text-sm mt-1">Delta, Time, Context</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <p className="text-green-300 font-semibold">Validated Signal</p>
                              <p className="text-slate-400 text-sm mt-1">High-probability setup</p>
                            </div>
                          </div>
                        )}
                        {selectedLayer === "execution" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                              <p className="text-purple-300 font-semibold">Webhook Listener</p>
                              <p className="text-slate-400 text-sm mt-1">TradingView alerts</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                              <p className="text-purple-300 font-semibold">Parse Signal</p>
                              <p className="text-slate-400 text-sm mt-1">Extract parameters</p>
                            </div>
                            <div className="text-center text-slate-500">↓</div>
                            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                              <p className="text-purple-300 font-semibold">Execute Order</p>
                              <p className="text-slate-400 text-sm mt-1">IBKR placement</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Code Resources Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Code Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-red-400">📊</span> Pine Script SMT Engine
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Multi-symbol SMT detection with non-repainting logic. Includes pivot-based analysis for ES, NQ, and YM.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Code
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-yellow-400">📈</span> FVG + MSS Framework
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Fair Value Gap detection and Market Structure Shift logic with displacement confirmation rules.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Code
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-blue-400">🐍</span> Python Execution Core
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  IBKR integration with webhook listener. Flask-based signal parser and order execution stub.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Code
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-purple-400">📚</span> Architecture README
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Complete technical documentation of all four architecture layers with implementation details.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* GitHub CTA */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Clone the repository and explore the complete trading automation system. All code is production-ready and fully documented.
            </p>
            <a
              href="https://github.com/maitethialeakey-droid"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Github size={20} />
              Visit GitHub Repository
              <ExternalLink size={16} />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8">
        <div className="container text-center text-slate-400 text-sm">
          <p>Trading Automation System Guide © 2026 • Built with React & TailwindCSS</p>
          <p className="mt-2">For educational purposes. Always validate trading strategies before live deployment.</p>
        </div>
      </footer>
    </div>
  );
}
