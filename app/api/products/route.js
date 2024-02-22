import { NextResponse } from 'next/server'
import latestProducts from '@/latest_product'

export async function GET(request){
    return NextResponse.json(latestProducts)
}
