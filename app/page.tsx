'use client'
import dynamic from 'next/dynamic';


const StockChart = dynamic(() => import("./components/StockChart"), {
    ssr: false // This ensures the component is not SSR'd
});

const timeInterval = "5min"
const ticker = "IBM"
const dataKey = `Time Series (${timeInterval})`
//TODO: backend to hide and ratelimit the use of expensive API_KEY
const stockDataApiUrl: string = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${timeInterval}&outputsize=full&apikey=`+process.env["NEXT_PUBLIC_DEMO_ALPHA_API_KEY"]

export default function Home() {
  return (
    <div>
      <main>
        <StockChart stockDataApiUrl={stockDataApiUrl} stockDataKey={dataKey}></StockChart>
      </main>
    </div>
  );
}
