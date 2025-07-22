import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PropertyList } from './components/PropertyList';
import { SellForm } from './components/SellForm';
import { LandPlot } from './types';
import { INITIAL_LAND_PLOTS } from './constants';

type View = 'buy' | 'sell';

function App() {
  const [view, setView] = useState<View>('buy');
  const [landPlots, setLandPlots] = useState<LandPlot[]>(INITIAL_LAND_PLOTS);

  const handleAddLandPlot = useCallback((newLandPlot: LandPlot) => {
    setLandPlots(prevLandPlots => [newLandPlot, ...prevLandPlots]);
    setView('buy'); // Switch back to buy view after adding
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header currentView={view} onViewChange={setView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {view === 'buy' && <PropertyList landPlots={landPlots} />}
        {view === 'sell' && <SellForm onAddLandPlot={handleAddLandPlot} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;