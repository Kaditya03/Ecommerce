export async function PATCH(req: Request) {
  const { id, status } = await req.json();
  await Order.findByIdAndUpdate(id, { status });
  return NextResponse.json({ success: true });
}
