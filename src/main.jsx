import { supabaseConfigured, supabase } from "./lib/supabase";
import jsPDF from "jspdf";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  IndianRupee,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Bell,
  LogOut,
  Boxes,
  ShoppingCart,
  BarChart3,
  LayoutDashboard,
  Menu,
  Plus,
  PackagePlus,
  TrendingUp,
  Search,
  CalendarDays,
  Trash2
} from "lucide-react";
import "./index.css";


function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-700 text-white">
        <IndianRupee size={23} />
      </div>

      <div>
        <b className="text-lg tracking-tight">MUNEEM JI</b>
        <div className="text-xs text-slate-500">
          Smart. Simple. Your Business.
        </div>
      </div>
    </div>
  );
}


function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  right
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
        />
        {right}
      </div>
    </label>
  );
}


function Login({ goSetup, goDashboard } = {}) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    setError("");
    setMessage("");

    if (!supabaseConfigured || !supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    if (!email || !pass) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pass
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    goDashboard?.();
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-4">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white auth-panel md:grid-cols-2">

        <div className="hidden bg-emerald-700 p-10 text-white md:flex md:flex-col md:justify-between">

          <div className="text-lg font-bold">
            ₹ MUNEEM JI
          </div>

          <div>
            <h1 className="max-w-md text-4xl font-bold leading-tight">
              Your shop's everyday hisaab, made simple.
            </h1>

            <p className="mt-4 text-emerald-50/85">
              Track sales, stock and profit without maintaining separate registers.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Track sales in seconds",
                "Manage stock easily",
                "Know your profit clearly",
                "Reports when you need them"
              ].map(x => (
                <div className="flex items-center gap-3 text-sm" key={x}>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15">
                    <Check size={15} />
                  </span>
                  {x}
                </div>
              ))}
            </div>
          </div>

          <small className="text-emerald-100/70">
            Secure account powered by Supabase
          </small>

        </div>


        <div className="p-6 sm:p-10">

          <div className="mb-8 md:hidden">
            <Logo />
          </div>

          {!supabaseConfigured && (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Supabase is not configured. Check your .env.local file.
            </div>
          )}

          <p className="text-sm font-semibold text-emerald-700">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Login to Muneem Ji
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your shop data stays with your account.
          </p>

          <div className="mt-8 space-y-5">

            <Field
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Field
              label="Password"
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              right={
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                {message}
              </div>
            )}

            <div className="flex justify-end">
              <button className="text-sm font-medium text-emerald-700">
                Forgot password?
              </button>
            </div>

            <button
              disabled={loading}
              onClick={login}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="my-7 flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            OR
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              onClick={goSetup}
              className="font-semibold text-emerald-700"
            >
              Create account
            </button>
          </p>

        </div>

      </div>
    </div>
  );
}


function Setup({ done, goLogin } = {}) {

  const [owner, setOwner] = useState("");
  const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const signup = async () => {
    setError("");
    setMessage("");

    if (!supabaseConfigured || !supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    if (!owner.trim() || !shop.trim() || !email.trim() || pass.length < 6) {
      setError("Fill all fields. Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: pass,
      options: {
        data: {
          owner_name: owner.trim(),
          shop_name: shop.trim()
        }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      done?.();
    } else {
      setMessage(
        "Account created. Check your email to confirm your account, then login."
      );
    }
  };

  return (
    <div className="app-shell flex min-h-screen items-center justify-center p-4">

      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

        <Logo />

        <p className="mt-8 text-sm font-semibold text-emerald-700">
          Create your account
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Set up your shop
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Your account will own its shop data securely.
        </p>

        <div className="mt-8 space-y-5">

          <Field
            label="Your name"
            placeholder="Sharma Ji"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />

          <Field
            label="Shop name"
            placeholder="Sharma General Store"
            value={shop}
            onChange={e => setShop(e.target.value)}
          />

          <Field
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Field
            label="Password"
            type={show ? "text" : "password"}
            placeholder="At least 6 characters"
            value={pass}
            onChange={e => setPass(e.target.value)}
            right={
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <button
            disabled={loading}
            onClick={signup}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
            <ArrowRight size={18} />
          </button>

          <button
            onClick={goLogin}
            className="w-full py-2 text-sm font-semibold text-slate-500"
          >
            Already have an account? Login
          </button>

        </div>

      </div>
    </div>
  );
}


function Dashboard({
  logout,
  goProducts,
  goSales,
  goReports,
  products,
  sales,
  ownerName
}) {

  const now = new Date();

  const startToday = new Date(now);
  startToday.setHours(0, 0, 0, 0);

  const startWeek = new Date(now);
  startWeek.setDate(startWeek.getDate() - 6);
  startWeek.setHours(0, 0, 0, 0);

  const today = sales.filter(
    x => new Date(x.createdAt) >= startToday
  );

  const week = sales.filter(
    x => new Date(x.createdAt) >= startWeek
  );

  const todaySales = today.reduce(
    (sum, x) => sum + x.total,
    0
  );

  const todayProfit = today.reduce(
    (sum, x) => sum + x.profit,
    0
  );

  const lowStock = products.filter(
    p => p.stock <= 20
  ).length;

  const weekSales = week.reduce(
    (sum, x) => sum + x.total,
    0
  );

  const weekProfit = week.reduce(
    (sum, x) => sum + x.profit,
    0
  );

  const totalProfit = sales.reduce(
    (sum, x) => sum + x.profit,
    0
  );

  return (
    <div className="app-shell min-h-screen">

      <header className="border-b border-slate-200 bg-white/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

          <Logo />

          <div className="flex gap-2">

            <button className="rounded-xl p-2.5 text-slate-500">
              <Bell size={20} />
            </button>

            <button
              onClick={logout}
              className="rounded-xl p-2.5 text-slate-500"
            >
              <LogOut size={20} />
            </button>

          </div>

        </div>
      </header>


      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6">

        <p className="text-sm text-slate-500">
          {new Intl.DateTimeFormat("en-IN", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
          }).format(now)}
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Namaste, {ownerName || "Ji"} 👋
        </h1>


        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">

          {[
            [`Today's Sales`, `₹${todaySales.toFixed(0)}`, IndianRupee],
            [`Today's Profit`, `₹${todayProfit.toFixed(0)}`, TrendingUp],
            [`Total Profit`, `₹${totalProfit.toFixed(0)}`, TrendingUp],
            [`Total Products`, String(products.length), Boxes],
            [`Low Stock`, String(lowStock), Bell]
          ].map(([a, b, I]) => (
            <div
              key={a}
              className="metric rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between text-xs text-slate-500 sm:text-sm">
                {a}
                <I size={17} className="text-emerald-700" />
              </div>

              <div className="mt-3 text-xl font-bold sm:text-2xl">
                {b}
              </div>
            </div>
          ))}

        </div>


        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">

          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex justify-between">

              <div>
                <h2 className="font-semibold">
                  This Week
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Live from recorded sales
                </p>
              </div>

              <button
                onClick={goSales}
                className="text-sm font-semibold text-emerald-700"
              >
                New sale
              </button>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <small className="text-slate-500">
                  Sales
                </small>

                <div className="mt-2 text-xl font-bold">
                  ₹{weekSales.toFixed(0)}
                </div>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <small className="text-emerald-700">
                  Profit
                </small>

                <div className="mt-2 text-xl font-bold text-emerald-800">
                  ₹{weekProfit.toFixed(0)}
                </div>
              </div>

            </div>

          </section>


          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <h2 className="font-semibold">
              Quick Actions
            </h2>

            <div className="mt-4 grid gap-3">

              <button
                onClick={goSales}
                className="flex items-center justify-between rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white"
              >
                <span className="flex gap-2">
                  <ShoppingCart size={18} />
                  New Sale
                </span>

                <Plus size={18} />
              </button>

              <button
                onClick={goProducts}
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3.5 font-semibold"
              >
                <span className="flex gap-2">
                  <PackagePlus size={18} />
                  Add Product
                </span>

                <Plus size={18} />
              </button>

            </div>

          </section>

        </div>


        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex justify-between">

              <h2 className="font-semibold">
                Recent Sales
              </h2>

              <button
                onClick={goSales}
                className="text-sm font-semibold text-emerald-700"
              >
                New sale
              </button>

            </div>

            {sales.length === 0 ? (

              <p className="py-8 text-center text-sm text-slate-500">
                No sales recorded yet.
              </p>

            ) : (

              sales.slice(-5).reverse().map(x => (

                <div
                  key={x.id}
                  className="flex justify-between border-b border-slate-100 py-4 last:border-0"
                >

                  <div>

                    <b>{x.productName}</b>

                    <div className="text-xs text-slate-500">
                      {x.qty} × ₹{x.salePrice}
                    </div>

                  </div>

                  <div className="text-right">

                    <b>
                      ₹{x.total.toFixed(0)}
                    </b>

                    <div className="text-xs text-emerald-700">
                      Profit ₹{x.profit.toFixed(0)}
                    </div>

                  </div>

                </div>

              ))

            )}

          </section>


          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex justify-between">

              <h2 className="font-semibold">
                Low Stock
              </h2>

              <button
                onClick={goProducts}
                className="text-sm font-semibold text-emerald-700"
              >
                View products
              </button>

            </div>

            {products
              .filter(p => p.stock <= 20)
              .slice(0, 4)
              .map(p => (

                <div
                  key={p.code}
                  className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0"
                >

                  <div>
                    <b>{p.name}</b>

                    <div className="text-xs text-slate-500">
                      Current stock
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.stock <= 10
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                      }`}
                  >
                    {p.stock} left
                  </span>

                </div>

              ))}

          </section>

        </div>

      </main>


      <BottomNav
        active="Home"
        goHome={() => { }}
        goProducts={goProducts}
        goSales={goSales}
        goReports={goReports}
      />

    </div>
  );
}


function BottomNav({
  active,
  goHome,
  goProducts,
  goSales,
  goReports
}) {

  const items = [
    [LayoutDashboard, "Home"],
    [Boxes, "Products"],
    [ShoppingCart, "Sales"],
    [BarChart3, "Reports"],
    [Menu, "More"]
  ];

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-2xl justify-around py-2">

        {items.map(([I, t]) => (

          <button
            key={t}
            onClick={() =>
              t === "Home" && goHome?.() ||
              t === "Products" && goProducts?.() ||
              t === "Sales" && goSales?.() ||
              t === "Reports" && goReports?.()
            }
            className={`flex min-w-16 flex-col items-center gap-1 px-3 py-2 text-[11px] ${active === t
              ? "text-emerald-700"
              : "text-slate-500"
              }`}
          >
            <I size={19} />
            {t}
          </button>

        ))}

      </div>

    </nav>
  );
}


function Products({
  products,
  setProducts,
  shopId,
  goHome,
  goSales,
  goReports
} = {}) {

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
    buy: "",
    sell: "",
    stock: "",
    addStock: ""
  });

  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const filtered = products.filter(
    p =>
      (p.isActive !== false) &&
      (p.name + " " + p.code)
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  const reset = () => setForm({
    name: "",
    code: "",
    buy: "",
    sell: "",
    stock: "",
    addStock: ""
  });

  const notify = (m) => {
    setSaved(m);
    setTimeout(() => setSaved(""), 1800);
  };

  const addProduct = async () => {

    setError("");

    if (!shopId) {
      setError(
        "Shop account is still loading. Please try again."
      );
      return;
    }

    if (
      !form.name.trim() ||
      !form.code.trim() ||
      form.buy === "" ||
      form.sell === "" ||
      form.stock === ""
    ) return;

    setBusy(true);

    const { data, error } = await supabase
      .from("products")
      .insert({
        shop_id: shopId,
        name: form.name.trim(),
        code: form.code.trim(),
        purchase_price: Math.max(0, Number(form.buy)),
        selling_price: Math.max(0, Number(form.sell)),
        stock: Math.max(0, Number(form.stock))
      })
      .select()
      .single();

    setBusy(false);

    if (error) {
      setError(
        error.code === "23505"
          ? "This product code already exists in your shop."
          : error.message
      );
      return;
    }

    setProducts([
      dataToProduct(data),
      ...products
    ]);

    reset();
    setOpen(false);

    notify("Product added successfully");
  };


  const openEdit = p => {
    setEditing(p);

    setForm({
      name: p.name,
      code: p.code,
      buy: String(p.buy),
      sell: String(p.sell),
      stock: String(p.stock),
      addStock: ""
    });

    setError("");
    setEditOpen(true);
  };


  const deleteProduct = async (p) => {

    if (!window.confirm(
      `Delete ${p.name}? It will be removed from your active products. Sales history will be preserved.`
    )) return;

    setBusy(true);
    setError("");

    const { error } = await supabase.rpc(
      "delete_product",
      { p_product_id: p.id }
    );

    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }

    setProducts(
      products.filter(x => x.id !== p.id)
    );

    notify("Product deleted");
  };


  const saveEdit = async () => {

    setError("");

    if (
      !editing ||
      !form.name.trim() ||
      !form.code.trim() ||
      form.buy === "" ||
      form.sell === ""
    ) return;

    const extra = Math.max(
      0,
      Number(form.addStock || 0)
    );

    const stock =
      Math.max(0, Number(form.stock)) +
      extra;

    setBusy(true);

    const { data, error } = await supabase
      .from("products")
      .update({
        name: form.name.trim(),
        code: form.code.trim(),
        purchase_price: Math.max(
          0,
          Number(form.buy)
        ),
        selling_price: Math.max(
          0,
          Number(form.sell)
        ),
        stock,
        updated_at: new Date().toISOString()
      })
      .eq("id", editing.id)
      .select()
      .single();

    setBusy(false);

    if (error) {
      setError(
        error.code === "23505"
          ? "This product code already exists in your shop."
          : error.message
      );
      return;
    }

    setProducts(
      products.map(p =>
        p.id === editing.id
          ? dataToProduct(data)
          : p
      )
    );

    setEditing(null);
    setEditOpen(false);
    reset();

    notify(
      extra > 0
        ? `Product updated • ${extra} stock added`
        : "Product updated"
    );
  };


  return (
    <div className="app-shell min-h-screen">

      <header className="border-b border-slate-200 bg-white/90">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

          <button
            onClick={goHome}
            className="text-left"
          >
            <Logo />
          </button>

          <button
            onClick={() => {
              setError("");
              setOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">
              Add Product
            </span>
          </button>

        </div>

      </header>


      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6">

        <div>

          <p className="text-sm text-slate-500">
            Inventory
          </p>

          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Products are now saved permanently to your Muneem Ji account.
          </p>

        </div>


        <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/10">

          <Search
            size={19}
            className="text-slate-400"
          />

          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search product name / code"
            className="w-full bg-transparent outline-none text-sm sm:text-base"
          />

        </div>


        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}


        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {filtered.map(p => (

            <article
              key={p.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-emerald-200"
            >

              <div className="flex items-start justify-between gap-3">

                <div>

                  <h2 className="font-semibold text-slate-900">
                    {p.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {p.code}
                  </p>

                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${p.stock <= 10
                    ? "bg-red-50 text-red-700"
                    : p.stock <= 20
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                    }`}
                >
                  {p.stock} in stock
                </span>

              </div>


              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">
                    Purchase
                  </div>

                  <div className="mt-1 font-semibold">
                    ₹{p.buy}
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3">
                  <div className="text-xs text-emerald-700">
                    Default selling
                  </div>

                  <div className="mt-1 font-semibold text-emerald-800">
                    ₹{p.sell}
                  </div>
                </div>

              </div>


              <div className="mt-3 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Profit / unit:
                  {" "}
                  <b className="text-emerald-700">
                    ₹{p.sell - p.buy}
                  </b>
                </span>

                <div className="flex gap-2">

                  <button
                    onClick={() => openEdit(p)}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>

                  <button
                    disabled={busy}
                    onClick={() => deleteProduct(p)}
                    aria-label={`Delete ${p.name}`}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>


        {filtered.length === 0 && (

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

            <Boxes
              className="mx-auto text-slate-300"
              size={36}
            />

            <h2 className="mt-3 font-semibold">
              {products.length
                ? "No product found"
                : "No products yet"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {products.length
                ? "Try another name or product code."
                : "Add your first product to start managing stock."}
            </p>

            {!products.length && (
              <button
                onClick={() => setOpen(true)}
                className="mt-5 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white"
              >
                Add First Product
              </button>
            )}

          </div>

        )}

      </main>




      {saved && (
        <div
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {saved}
        </div>
      )}


      <BottomNav
        active="Products"
        goHome={goHome}
        goProducts={() => { }}
        goSales={goSales}
        goReports={goReports}
      />


      {open && (

        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl sm:p-8">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-emerald-700">
                  Inventory
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Add Product
                </h2>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-slate-400"
              >
                ✕
              </button>

            </div>


            <div className="mt-6 grid gap-4">

              <Field
                label="Product name"
                placeholder="Parle-G 100g"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <Field
                label="Product code"
                placeholder="PG001"
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">

                <Field
                  label="Purchase price"
                  type="number"
                  placeholder="8"
                  value={form.buy}
                  onChange={e => setForm({ ...form, buy: e.target.value })}
                />

                <Field
                  label="Default selling price"
                  type="number"
                  placeholder="10"
                  value={form.sell}
                  onChange={e => setForm({ ...form, sell: e.target.value })}
                />

              </div>

              <Field
                label="Initial stock"
                type="number"
                placeholder="50"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
              />

              <button
                disabled={busy}
                onClick={addProduct}
                className="mt-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Saving..." : "Save Product"}
              </button>

            </div>

          </div>

        </div>

      )}


      {editOpen && (

        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4">

          <div className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl sm:p-8">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-emerald-700">
                  Product Management
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Edit Product
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update details or add newly received stock.
                </p>

              </div>

              <button
                onClick={() => setEditOpen(false)}
                className="rounded-xl p-2 text-slate-400"
              >
                ✕
              </button>

            </div>


            <div className="mt-6 grid gap-4">

              <Field
                label="Product name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />

              <Field
                label="Product code"
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">

                <Field
                  label="Purchase price"
                  type="number"
                  value={form.buy}
                  onChange={e => setForm({ ...form, buy: e.target.value })}
                />

                <Field
                  label="Default selling price"
                  type="number"
                  value={form.sell}
                  onChange={e => setForm({ ...form, sell: e.target.value })}
                />

              </div>


              <div className="grid grid-cols-2 gap-3">

                <Field
                  label="Current stock"
                  type="number"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                />

                <Field
                  label="Add stock (restock)"
                  type="number"
                  placeholder="e.g. 50"
                  value={form.addStock}
                  onChange={e => setForm({ ...form, addStock: e.target.value })}
                />

              </div>


              <div className="rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">
                After saving, stock will be{" "}
                <b>
                  {Number(form.stock || 0) + Number(form.addStock || 0)}
                </b>
                {" "}units.
              </div>


              <button
                disabled={busy}
                onClick={saveEdit}
                className="mt-2 rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white disabled:opacity-50"
              >
                {busy ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


function dataToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    stock: row.stock,
    buy: Number(row.purchase_price),
    sell: Number(row.selling_price),
    isActive: row.is_active !== false
  };
}


/* =========================================================
   BILL / PDF / SHARE HELPERS
   ========================================================= */

function getInvoiceNumber(salesList = []) {
  const numbers = (salesList || [])
    .map(sale => String(sale?.invoiceNo || "").match(/^MJ-(\d+)$/i))
    .filter(Boolean)
    .map(match => Number(match[1]));

  const nextNumber = numbers.length ? Math.max(...numbers) + 1 : 1;
  return `MJ-${String(nextNumber).padStart(4, "0")}`;
}

function buildBillPdf(bill) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("MUNEEM JI", 16, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Smart. Simple. Your Business.", 16, y + 6);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("INVOICE", pageWidth - 16, y, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Bill No: ${bill.invoiceNo}`, pageWidth - 16, y + 6, { align: "right" });
  doc.text(`Date: ${new Date(bill.createdAt).toLocaleString("en-IN")}`, pageWidth - 16, y + 11, { align: "right" });

  y += 27;
  doc.setDrawColor(220, 220, 220);
  doc.line(16, y, pageWidth - 16, y);
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Customer", 16, y);

  doc.setFont("helvetica", "normal");
  doc.text(bill.customerName || "Walk-in Customer", 16, y + 6);
  if (bill.customerPhone) {
    doc.text(`Mobile: ${bill.customerPhone}`, 16, y + 11);
  }

  y += 22;

  const col = { item: 16, qty: 118, price: 145, total: 190 };

  doc.setFillColor(245, 247, 248);
  doc.rect(14, y - 5, pageWidth - 28, 9, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Item", col.item, y);
  doc.text("Qty", col.qty, y, { align: "right" });
  doc.text("Price", col.price, y, { align: "right" });
  doc.text("Total", col.total, y, { align: "right" });
  y += 8;

  doc.setFont("helvetica", "normal");

  (bill.items || []).forEach((item) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    doc.text(String(item.productName || "Product").slice(0, 48), col.item, y);
    doc.text(String(item.quantity), col.qty, y, { align: "right" });
    doc.text(`Rs. ${Number(item.salePrice || 0).toFixed(2)}`, col.price, y, { align: "right" });
    doc.text(`Rs. ${Number(item.total || item.salePrice * item.quantity || 0).toFixed(2)}`, col.total, y, { align: "right" });
    y += 7;
  });

  y += 5;
  doc.line(110, y, pageWidth - 16, y);
  y += 8;

  const summaryX = 145;
  const valueX = pageWidth - 16;

  doc.text("Subtotal", summaryX, y);
  doc.text(`Rs. ${Number(bill.subtotal || 0).toFixed(2)}`, valueX, y, { align: "right" });
  y += 7;

  if (Number(bill.discount || 0) > 0) {
    doc.text("Discount", summaryX, y);
    doc.text(`- Rs. ${Number(bill.discount).toFixed(2)}`, valueX, y, { align: "right" });
    y += 7;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Grand Total", summaryX, y + 2);
  doc.text(`Rs. ${Number(bill.total || 0).toFixed(2)}`, valueX, y + 2, { align: "right" });

  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Thank you for your purchase!", pageWidth / 2, y, { align: "center" });
  doc.text("Muneem Ji", pageWidth / 2, y + 5, { align: "center" });

  return doc;
}

function billToText(bill) {
  const items = (bill.items || [])
    .map(item => `• ${item.productName} × ${item.quantity} — Rs. ${Number(item.total || 0).toFixed(2)}`)
    .join("\n");

  return `MUNEEM JI\n\nBill No: ${bill.invoiceNo}\nCustomer: ${bill.customerName || "Walk-in Customer"}${bill.customerPhone ? `\nMobile: ${bill.customerPhone}` : ""}\n\nPurchased Items:\n${items}\n\nSubtotal: Rs. ${Number(bill.subtotal || 0).toFixed(2)}\nDiscount: Rs. ${Number(bill.discount || 0).toFixed(2)}\nTotal: Rs. ${Number(bill.total || 0).toFixed(2)}\n\nThank you for your purchase!`;
}

/* =========================================================
   PHASE 2.1 - BILLING
   ========================================================= */

function Sales({
  products,
  setProducts,
  sales,
  setSales,
  goHome,
  goProducts,
  goReports,
  deleteSale
}) {

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");

  const [cart, setCart] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [discount, setDiscount] = useState(0);

  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [lastBill, setLastBill] = useState(null);
  const [recentBill, setRecentBill] = useState(null);

  const downloadBillPdf = (bill = lastBill) => {
    if (!bill) return;

    const doc = buildBillPdf(bill);
    const safeName = (bill.customerName || "Walk-in-Customer")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "");

    doc.save(
      `Muneem-Ji-${safeName || "Bill"}-${bill.invoiceNo}.pdf`
    );
  };

  const shareBill = async (bill = lastBill) => {
    if (!bill) return;

    const text = billToText(bill);

    try {
      const doc = buildBillPdf(bill);
      const blob = doc.output("blob");
      const file = new File(
        [blob],
        `Muneem-Ji-${bill.invoiceNo}.pdf`,
        { type: "application/pdf" }
      );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: `Muneem Ji Bill ${bill.invoiceNo}`,
          text,
          files: [file]
        });
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: `Muneem Ji Bill ${bill.invoiceNo}`,
          text
        });
        return;
      }

      await navigator.clipboard.writeText(text);
      setSaved("Bill copied to clipboard");
      setTimeout(() => setSaved(""), 2500);
    } catch (err) {
      if (err?.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(text);
        setSaved("Bill copied to clipboard");
        setTimeout(() => setSaved(""), 2500);
      } catch {
        setError("Unable to share bill on this device.");
      }
    }
  };
  const shareBillWhatsApp = (bill = lastBill) => {
    if (!bill) return;

    const text = billToText(bill);
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };


  const filtered = products.filter(
    p =>
      (p.name + " " + p.code)
        .toLowerCase()
        .includes(query.toLowerCase())
  );


  const choose = (p) => {
    setSelected(p);
    setPrice(String(p.sell));
    setQty(1);
    setQuery("");
    setError("");
  };


  const addToBill = () => {

    setError("");

    if (!selected) {
      setError("Select a product first.");
      return;
    }

    const quantity = Number(qty);
    const salePrice = Number(price);

    if (!quantity || quantity < 1) {
      setError("Enter a valid quantity.");
      return;
    }

    if (quantity > selected.stock) {
      setError(
        `Only ${selected.stock} units available.`
      );
      return;
    }

    if (price === "" || salePrice < 0) {
      setError("Enter a valid selling price.");
      return;
    }


    const existing = cart.find(
      x => x.productId === selected.id
    );


    if (existing) {

      const newQty =
        existing.quantity + quantity;

      if (newQty > selected.stock) {
        setError(
          `Only ${selected.stock} units available for ${selected.name}.`
        );
        return;
      }

      setCart(
        cart.map(x =>
          x.productId === selected.id
            ? {
              ...x,
              quantity: newQty,
              salePrice
            }
            : x
        )
      );

    } else {

      setCart([
        ...cart,
        {
          productId: selected.id,
          productName: selected.name,
          code: selected.code,
          quantity,
          salePrice,
          buyPrice: selected.buy
        }
      ]);

    }


    setSelected(null);
    setQty(1);
    setPrice("");
  };


  const removeFromBill = (productId) => {
    setCart(
      cart.filter(
        x => x.productId !== productId
      )
    );
  };


  const subtotal = cart.reduce(
    (sum, x) =>
      sum + (x.salePrice * x.quantity),
    0
  );


  const safeDiscount = Math.min(
    Math.max(0, Number(discount || 0)),
    subtotal
  );


  const grandTotal =
    subtotal - safeDiscount;


  const estimatedProfit =
    cart.reduce(
      (sum, x) =>
        sum +
        ((x.salePrice - x.buyPrice) * x.quantity),
      0
    ) -
    safeDiscount;


  const completeBill = async () => {

    setError("");

    if (!supabase) {
      setError(
        "Supabase is not configured."
      );
      return;
    }

    if (cart.length === 0) {
      setError(
        "Add at least one product to the bill."
      );
      return;
    }


    if (
      customerPhone &&
      !/^[0-9+\-\s()]{7,15}$/.test(customerPhone)
    ) {
      setError(
        "Enter a valid customer mobile number."
      );
      return;
    }


    setBusy(true);


    const items = cart.map(x => ({
      product_id: x.productId,
      quantity: x.quantity,
      sale_price: x.salePrice
    }));


    const {
      data: saleId,
      error: rpcError
    } = await supabase.rpc(
      "complete_bill",
      {
        p_customer_name:
          customerName.trim(),

        p_customer_phone:
          customerPhone.trim(),

        p_discount:
          safeDiscount,

        p_items:
          items
      }
    );


    if (rpcError) {

      setBusy(false);
      setError(rpcError.message);

      return;
    }


    const saleRecord = {

      id: saleId,

      createdAt:
        new Date().toISOString(),

      customerName:
        customerName.trim(),

      customerPhone:
        customerPhone.trim(),

      items: cart,

      productId:
        cart[0]?.productId,

      productName:
        cart.length === 1
          ? cart[0].productName
          : `${cart[0].productName} + ${cart.length - 1} more`,

      code:
        cart[0]?.code || "",

      qty:
        cart.reduce(
          (sum, x) => sum + x.quantity,
          0
        ),

      salePrice:
        cart.length === 1
          ? cart[0].salePrice
          : 0,

      subtotal,

      discount:
        safeDiscount,

      total:
        grandTotal,

      profit:
        estimatedProfit
    };


    setProducts(
      products.map(p => {

        const item =
          cart.find(
            x => x.productId === p.id
          );

        if (!item) return p;

        return {
          ...p,
          stock:
            p.stock - item.quantity
        };

      })
    );


    const bill = {
      ...saleRecord,
      invoiceNo: getInvoiceNumber(sales)
    };

    setSales([
      ...(sales || []),
      bill
    ]);

    setLastBill(bill);
    setBusy(false);

    setSaved(
      `Bill generated • Total ₹${grandTotal.toFixed(2)}`
    );

    setCart([]);
    setCustomerName("");
    setCustomerPhone("");
    setDiscount(0);
    setSelected(null);
    setPrice("");
    setQty(1);


    setTimeout(
      () => setSaved(""),
      3000
    );
  };


  return (
    <div className="app-shell min-h-screen">

      <header className="border-b border-slate-200 bg-white/90">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

          <button
            onClick={goHome}
            className="text-left"
          >
            <Logo />
          </button>

          <button
            onClick={goProducts}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Products
          </button>

        </div>

      </header>


      <main className="mx-auto max-w-3xl px-4 py-6 pb-28 sm:px-6">

        <p className="text-sm text-slate-500">
          Billing
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          New Bill
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Create a bill with multiple products and customer details.
        </p>


        {/* CUSTOMER */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">

          <h2 className="font-semibold">
            Customer Details
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <Field
              label="Customer name"
              placeholder="Optional"
              value={customerName}
              onChange={e =>
                setCustomerName(e.target.value)
              }
            />

            <Field
              label="Mobile number"
              type="tel"
              placeholder="Optional"
              value={customerPhone}
              onChange={e =>
                setCustomerPhone(e.target.value)
              }
            />

          </div>

        </section>


        {/* ADD PRODUCT */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

          <h2 className="font-semibold">
            Add Products
          </h2>


          <label className="mt-4 block">

            <span className="mb-2 block text-sm font-medium text-slate-700">
              Search product
            </span>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">

              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelected(null);
                }}
                placeholder="Search product name / code"
                className="w-full outline-none"
              />

            </div>

          </label>


          {query && (

            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">

              {filtered.length === 0 ? (

                <div className="p-4 text-sm text-slate-500">
                  No products found.
                </div>

              ) : (

                filtered.map(p => (

                  <button
                    key={p.id}
                    onClick={() => choose(p)}
                    className="flex w-full items-center justify-between border-b border-slate-100 bg-white px-4 py-3 text-left last:border-0 hover:bg-slate-50"
                  >

                    <span>
                      <b>{p.name}</b>

                      <small className="ml-2 text-slate-400">
                        {p.code}
                      </small>
                    </span>

                    <span className="text-xs text-slate-500">
                      {p.stock} left
                    </span>

                  </button>

                ))

              )}

            </div>

          )}


          {error && (

            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>

          )}


          {selected && (

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="font-semibold">
                    {selected.name}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {selected.code} • {selected.stock} in stock
                  </p>

                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="text-xs font-semibold text-slate-500"
                >
                  Change
                </button>

              </div>


              <div className="mt-5 grid grid-cols-2 gap-4">

                <Field
                  label="Quantity"
                  type="number"
                  value={qty}
                  onChange={e =>
                    setQty(
                      e.target.value === ""
                        ? ""
                        : Math.min(
                          selected.stock,
                          Math.max(
                            1,
                            Number(e.target.value)
                          )
                        )
                    )
                  }
                />

                <Field
                  label="Sale price / item"
                  type="number"
                  value={price}
                  onChange={e =>
                    setPrice(e.target.value)
                  }
                />

              </div>


              <div className="mt-4 rounded-xl bg-white p-4">

                <div className="flex justify-between text-sm">

                  <span className="text-slate-500">
                    Item total
                  </span>

                  <b>
                    ₹{(
                      Number(price || 0) *
                      Number(qty || 0)
                    ).toFixed(2)}
                  </b>

                </div>

              </div>


              <button
                onClick={addToBill}
                className="mt-4 w-full rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white"
              >
                Add to Bill
              </button>

            </div>

          )}

        </section>


        {/* BILL ITEMS */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex items-center justify-between">

            <h2 className="font-semibold">
              Bill Items
            </h2>

            <span className="text-xs text-slate-500">
              {cart.length} product{cart.length === 1 ? "" : "s"}
            </span>

          </div>


          {cart.length === 0 ? (

            <div className="py-8 text-center text-sm text-slate-500">
              No products added yet.
            </div>

          ) : (

            <div className="mt-4 divide-y divide-slate-100">

              {cart.map(item => (

                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-3 py-4"
                >

                  <div className="min-w-0">

                    <b className="text-sm">
                      {item.productName}
                    </b>

                    <div className="mt-1 text-xs text-slate-500">
                      {item.quantity} × ₹{item.salePrice}
                    </div>

                  </div>


                  <div className="flex items-center gap-3">

                    <b>
                      ₹{(
                        item.quantity *
                        item.salePrice
                      ).toFixed(2)}
                    </b>

                    <button
                      onClick={() =>
                        removeFromBill(
                          item.productId
                        )
                      }
                      className="rounded-lg border border-red-200 px-2.5 py-2 text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* BILL SUMMARY */}

        {cart.length > 0 && (

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

            <h2 className="font-semibold">
              Bill Summary
            </h2>


            <div className="mt-4 space-y-3">

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Subtotal
                </span>

                <b>
                  ₹{subtotal.toFixed(2)}
                </b>

              </div>


              <div className="flex items-center justify-between gap-4">

                <span className="text-slate-500">
                  Discount
                </span>

                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={e =>
                    setDiscount(
                      Math.max(
                        0,
                        Number(
                          e.target.value || 0
                        )
                      )
                    )
                  }
                  className="w-32 rounded-xl border border-slate-200 px-3 py-2 text-right outline-none focus:border-emerald-600"
                />

              </div>


              <div className="flex justify-between border-t border-slate-100 pt-3 text-lg">

                <span className="font-semibold">
                  Grand Total
                </span>

                <b className="text-emerald-700">
                  ₹{grandTotal.toFixed(2)}
                </b>

              </div>


              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500">
                Estimated profit: ₹{estimatedProfit.toFixed(2)}
              </div>

            </div>


            <button
              disabled={
                busy ||
                cart.length === 0
              }
              onClick={completeBill}
              className="mt-5 w-full rounded-xl bg-emerald-700 px-4 py-3.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy
                ? "Generating Bill..."
                : "Generate Bill"}
            </button>

          </section>

        )}


        {lastBill && (
          <section className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Bill generated successfully</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">{lastBill.invoiceNo}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {lastBill.customerName || "Walk-in Customer"} • ₹{Number(lastBill.total || 0).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setLastBill(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white"
                aria-label="Close bill actions"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={downloadBillPdf}
                className="rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white"
              >
                Download PDF
              </button>
              <button
                onClick={shareBill}
                className="rounded-xl border border-emerald-200 bg-white px-4 py-3 font-semibold text-emerald-800"
              >
                Share Bill
              </button>
              <button
                onClick={() => shareBillWhatsApp(lastBill)}
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800"
              >
                WhatsApp
              </button>
            </div>

            <p className="mt-3 text-xs text-emerald-700">
              Share Bill opens your device share menu. WhatsApp can also be opened directly.
            </p>
          </section>
        )}

        {/* RECENT SALES */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Recent Sales</h2>
              <p className="mt-1 text-xs text-slate-500">
                Customer and purchased items
              </p>
            </div>

            <button
              onClick={goReports}
              className="text-sm font-semibold text-emerald-700"
            >
              View all
            </button>
          </div>

          {(!sales || sales.length === 0) ? (
            <p className="py-8 text-center text-sm text-slate-500">
              No sales yet.
            </p>
          ) : (
            <div className="mt-3 divide-y divide-slate-100">
              {sales
                .slice(-8)
                .reverse()
                .map((x) => {

                  const customer =
                    x.customerName?.trim() || "Walk-in Customer";

                  const purchasedItems =
                    x.items?.length
                      ? x.items
                        .map(
                          (item) =>
                            `${item.productName} × ${item.quantity}`
                        )
                        .join(", ")
                      : x.productName || "Product";

                  return (
                    <div
                      key={x.id}
                      className="flex items-center justify-between gap-3 py-4"
                    >

                      {/* Customer + Items */}
                      <div className="min-w-0">

                        <div className="font-semibold text-sm text-slate-900">
                          {customer}
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          {purchasedItems}
                        </div>

                        {x.customerPhone && (
                          <div className="mt-1 text-xs text-slate-400">
                            {x.customerPhone}
                          </div>
                        )}

                      </div>


                      <button
                        onClick={() => setRecentBill(x)}
                        className="shrink-0 rounded-xl border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                      >
                        View Bill
                      </button>

                      {/* Amount + Delete */}
                      <div className="flex shrink-0 items-center gap-2">

                        <div className="text-right">
                          <div className="text-sm font-bold text-slate-900">
                            ₹{Number(x.total || 0).toFixed(2)}
                          </div>

                          {x.discount > 0 && (
                            <div className="text-xs text-slate-400">
                              Discount ₹{Number(x.discount).toFixed(2)}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => deleteSale?.(x)}
                          className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                          aria-label="Delete sale"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>

                    </div>
                  );
                })}
            </div>
          )}
        </section>

      </main>


      {recentBill && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Recent Bill</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">{recentBill.invoiceNo}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {recentBill.customerName || "Walk-in Customer"}
                  {recentBill.customerPhone ? ` • ${recentBill.customerPhone}` : ""}
                </p>
              </div>
              <button
                onClick={() => setRecentBill(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
                aria-label="Close bill"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <div className="text-xs text-slate-500">Date</div>
              <div className="mt-1 text-sm font-semibold">
                {new Date(recentBill.createdAt).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="mt-5 divide-y divide-slate-100 rounded-2xl border border-slate-100 px-4">
              {(recentBill.items || []).map((item, index) => (
                <div key={`${item.productId}-${index}`} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-800">{item.productName}</div>
                    <div className="text-xs text-slate-500">
                      {item.quantity} × ₹{Number(item.salePrice || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm font-bold">
                    ₹{Number(item.total || item.salePrice * item.quantity || 0).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <b>₹{Number(recentBill.subtotal || 0).toFixed(2)}</b>
              </div>
              {Number(recentBill.discount || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount</span>
                  <b>-₹{Number(recentBill.discount).toFixed(2)}</b>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-100 pt-3 text-lg">
                <span className="font-semibold">Total</span>
                <b className="text-emerald-700">₹{Number(recentBill.total || 0).toFixed(2)}</b>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                onClick={() => downloadBillPdf(recentBill)}
                className="rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white"
              >
                Download PDF
              </button>
              <button
                onClick={() => shareBill(recentBill)}
                className="rounded-xl border border-emerald-200 bg-white px-4 py-3 font-semibold text-emerald-800"
              >
                Share Bill
              </button>
              <button
                onClick={() => shareBillWhatsApp(recentBill)}
                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800"
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}


      {saved && (

        <div
          aria-live="polite"
          className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-medium text-white shadow-lg"
        >
          {saved}
        </div>

      )}


      <BottomNav
        active="Sales"
        goHome={goHome}
        goProducts={goProducts}
        goSales={() => { }}
        goReports={goReports}
      />

    </div>
  );
}


/* =========================================================
   REPORTS
   ========================================================= */

function Reports({
  sales,
  goHome,
  goProducts,
  goSales,
  deleteSale
}) {

  const [range, setRange] = useState("week");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [selectedSale, setSelectedSale] = useState(null);

  const downloadHistoryBill = (bill) => {
    if (!bill) return;

    const doc = buildBillPdf(bill);

    const safeName = (bill.customerName || "Walk-in-Customer")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "");

    doc.save(
      `Muneem-Ji-${safeName || "Bill"}-${bill.invoiceNo || "Bill"}.pdf`
    );
  };

  const shareHistoryBill = async (bill) => {
    if (!bill) return;

    const text = billToText(bill);

    try {
      const doc = buildBillPdf(bill);
      const blob = doc.output("blob");

      const file = new File(
        [blob],
        `Muneem-Ji-${bill.invoiceNo || "Bill"}.pdf`,
        { type: "application/pdf" }
      );

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: `Muneem Ji Bill ${bill.invoiceNo || ""}`,
          text,
          files: [file]
        });

        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: `Muneem Ji Bill ${bill.invoiceNo || ""}`,
          text
        });

        return;
      }

      await navigator.clipboard.writeText(text);

      alert("Bill details copied. You can paste them in WhatsApp.");
    } catch (err) {
      if (err?.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(text);
        alert("Bill details copied. You can paste them in WhatsApp.");
      } catch {
        alert("Unable to share bill on this device.");
      }
    }
  };

  const shareHistoryBillWhatsApp = (bill) => {
    if (!bill) return;

    const text = billToText(bill);

    const url =
      `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const now = new Date();

  const startOfDay = (d) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const endOfDay = (d) => {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  };


  let filtered = sales || [];


  if (range === "today") {

    const a = startOfDay(now);
    const b = endOfDay(now);

    filtered = filtered.filter(x => {
      const d = new Date(x.createdAt);
      return d >= a && d <= b;
    });

  } else if (range === "week") {

    const a = startOfDay(now);
    a.setDate(a.getDate() - 6);

    filtered = filtered.filter(
      x => new Date(x.createdAt) >= a
    );

  } else if (range === "month") {

    const a = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    filtered = filtered.filter(
      x => new Date(x.createdAt) >= a
    );

  } else if (
    range === "custom" &&
    from &&
    to
  ) {

    const a = startOfDay(
      new Date(`${from}T00:00:00`)
    );

    const b = endOfDay(
      new Date(`${to}T00:00:00`)
    );

    filtered = filtered.filter(x => {
      const d = new Date(x.createdAt);
      return d >= a && d <= b;
    });

  }


  const searched = filtered.filter(
    x =>
      (`${x.customerName || ""} ${x.customerPhone || ""} ${x.productName || ""} ${x.code || ""} ${(x.items || []).map(i => i.productName).join(" ")}`)
        .toLowerCase()
        .includes(search.toLowerCase())
  );


  const totalSales = filtered.reduce(
    (a, x) => a + x.total,
    0
  );

  const totalProfit = filtered.reduce(
    (a, x) => a + x.profit,
    0
  );

  const totalItems = filtered.reduce(
    (a, x) => a + x.qty,
    0
  );

  const transactionCount =
    filtered.length;

  const avgSale =
    transactionCount
      ? totalSales / transactionCount
      : 0;


  const daily = {};

  filtered.forEach(x => {

    const key =
      new Date(x.createdAt)
        .toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short"
          }
        );

    if (!daily[key]) {
      daily[key] = {
        sales: 0,
        profit: 0,
        items: 0
      };
    }

    daily[key].sales += x.total;
    daily[key].profit += x.profit;
    daily[key].items += x.qty;

  });


  const dailyRows =
    Object.entries(daily)
      .reverse()
      .slice(0, 14);


  const productMap = {};

  filtered.forEach(x => {
    (x.items || []).forEach(item => {
      const key = item.productId || item.productName;

      if (!productMap[key]) {
        productMap[key] = {
          name: item.productName,
          qty: 0,
          sales: 0,
          profit: 0
        };
      }

      productMap[key].qty += Number(item.quantity || 0);
      productMap[key].sales += Number(item.total || 0);
      productMap[key].profit += Number(item.profit || 0);
    });
  });


  const topProducts =
    Object.values(productMap)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);


  const money = (value) =>
    `Rs. ${Number(value || 0).toFixed(2)}`;


  const formatDate = (value) =>
    new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });


  const getItemsText = (sale) =>
    (sale.items || [])
      .map(
        item =>
          `${item.productName} x ${item.quantity} @ ${money(item.salePrice)} = ${money(item.total)}`
      )
      .join(", ") || sale.productName || "Sale";


  const downloadSalesReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 18;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("MUNEEM JI", 14, y);

    y += 8;
    doc.setFontSize(13);
    doc.text("Sales Report", 14, y);

    y += 7;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(
      `Period: ${range === "today" ? "Today" : range === "week" ? "This Week" : range === "month" ? "This Month" : "Custom"}`,
      14,
      y
    );

    y += 5;
    if (range === "custom" && from && to) {
      doc.text(`From: ${from}  To: ${to}`, 14, y);
      y += 5;
    }

    doc.text(`Generated: ${formatDate(new Date())}`, 14, y);
    y += 9;

    doc.setFont(undefined, "bold");
    doc.text(`Total Sales: ${money(totalSales)}`, 14, y);
    doc.text(`Profit/Loss: ${money(totalProfit)}`, 75, y);
    doc.text(`Transactions: ${transactionCount}`, 140, y);

    y += 9;
    doc.setFont(undefined, "normal");
    doc.setFontSize(9);

    const drawHeader = () => {
      doc.setFont(undefined, "bold");
      doc.text("Date", 14, y);
      doc.text("Customer", 43, y);
      doc.text("Items", 92, y);
      doc.text("Total", 171, y);
      y += 5;
      doc.setFont(undefined, "normal");
    };

    drawHeader();

    searched.forEach((sale, index) => {
      const customer = sale.customerName || "Walk-in Customer";
      const itemsText = getItemsText(sale);
      const lines = doc.splitTextToSize(itemsText, 72);

      if (y + Math.max(10, lines.length * 4) > 280) {
        doc.addPage();
        y = 18;
        drawHeader();
      }

      doc.text(formatDate(sale.createdAt).slice(0, 12), 14, y);
      doc.text(doc.splitTextToSize(customer, 43)[0], 43, y);
      doc.text(lines, 92, y);
      doc.text(money(sale.total), 171, y);

      y += Math.max(8, lines.length * 4 + 3);
    });

    if (!searched.length) {
      doc.text("No sales found for the selected period.", 14, y);
    }

    y += 7;
    if (y > 270) {
      doc.addPage();
      y = 18;
    }

    doc.setFont(undefined, "bold");
    doc.text("Summary", 14, y);
    y += 6;
    doc.setFont(undefined, "normal");
    doc.text(`Subtotal: ${money(filtered.reduce((a, x) => a + Number(x.subtotal || x.total || 0), 0))}`, 14, y);
    y += 5;
    doc.text(`Discount: ${money(filtered.reduce((a, x) => a + Number(x.discount || 0), 0))}`, 14, y);
    y += 5;
    doc.text(`Total Sales: ${money(totalSales)}`, 14, y);
    y += 5;
    doc.text(`Profit/Loss: ${money(totalProfit)}`, 14, y);

    doc.save(`Muneem-Ji-Sales-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };


  const downloadCustomerReport = () => {
    const customerMap = {};

    filtered.forEach(sale => {
      const name = sale.customerName?.trim() || "Walk-in Customer";
      const phone = sale.customerPhone?.trim() || "";

      const key = `${name.toLowerCase()}|${phone}`;

      if (!customerMap[key]) {
        customerMap[key] = {
          name,
          phone,
          bills: 0,
          purchase: 0,
          items: 0,
          lastPurchase: sale.createdAt
        };
      }

      customerMap[key].bills += 1;
      customerMap[key].purchase += Number(sale.total || 0);
      customerMap[key].items += Number(sale.qty || 0);

      if (
        new Date(sale.createdAt) >
        new Date(customerMap[key].lastPurchase)
      ) {
        customerMap[key].lastPurchase = sale.createdAt;
      }
    });

    const customers = Object.values(customerMap)
      .sort((a, b) => b.purchase - a.purchase);

    const doc = new jsPDF();
    let y = 18;

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    doc.text("MUNEEM JI", 14, y);

    y += 8;
    doc.setFontSize(13);
    doc.text("Customer Purchase Report", 14, y);

    y += 7;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text(`Generated: ${formatDate(new Date())}`, 14, y);

    y += 9;
    doc.setFont(undefined, "bold");
    doc.text(`Customers: ${customers.length}`, 14, y);
    doc.text(`Sales: ${money(totalSales)}`, 70, y);
    doc.text(`Profit/Loss: ${money(totalProfit)}`, 135, y);

    y += 9;
    doc.setFontSize(9);

    const drawCustomerHeader = () => {
      doc.setFont(undefined, "bold");
      doc.text("Customer", 14, y);
      doc.text("Phone", 65, y);
      doc.text("Bills", 112, y);
      doc.text("Items", 133, y);
      doc.text("Purchase", 153, y);
      y += 5;
      doc.setFont(undefined, "normal");
    };

    drawCustomerHeader();

    customers.forEach(customer => {
      if (y > 275) {
        doc.addPage();
        y = 18;
        drawCustomerHeader();
      }

      const customerName = doc.splitTextToSize(customer.name, 45)[0];
      const phone = customer.phone || "-";

      doc.text(customerName, 14, y);
      doc.text(phone.slice(0, 18), 65, y);
      doc.text(String(customer.bills), 112, y);
      doc.text(String(customer.items), 133, y);
      doc.text(money(customer.purchase), 153, y);

      y += 7;
    });

    if (!customers.length) {
      doc.text("No customer purchases found for the selected period.", 14, y);
    }

    y += 7;
    if (y > 270) {
      doc.addPage();
      y = 18;
    }

    doc.setFont(undefined, "bold");
    doc.text("Customer purchase details", 14, y);
    y += 7;
    doc.setFont(undefined, "normal");

    customers.forEach(customer => {
      if (y > 270) {
        doc.addPage();
        y = 18;
      }

      doc.setFont(undefined, "bold");
      doc.text(customer.name, 14, y);
      y += 4;

      doc.setFont(undefined, "normal");
      doc.text(
        `${customer.phone ? `Mobile: ${customer.phone}  ` : ""}Bills: ${customer.bills}  Items: ${customer.items}  Total: ${money(customer.purchase)}`,
        14,
        y
      );

      y += 4;
      const customerSales = filtered.filter(sale => {
        const saleName = sale.customerName?.trim() || "Walk-in Customer";
        const salePhone = sale.customerPhone?.trim() || "";
        return (
          saleName.toLowerCase() === customer.name.toLowerCase() &&
          salePhone === customer.phone
        );
      });

      customerSales.forEach(sale => {
        const lines = doc.splitTextToSize(
          `${formatDate(sale.createdAt)} — ${getItemsText(sale)} — ${money(sale.total)}`,
          175
        );

        if (y + lines.length * 4 > 275) {
          doc.addPage();
          y = 18;
        }

        doc.text(lines, 18, y);
        y += lines.length * 4 + 2;
      });

      y += 4;
    });

    doc.save(`Muneem-Ji-Customer-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };


  return (
    <div className="app-shell min-h-screen">

      <header className="border-b border-slate-200 bg-white/90">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

          <button
            onClick={goHome}
            className="text-left"
          >
            <Logo />
          </button>

          <button
            onClick={goSales}
            className="rounded-xl bg-emerald-700 px-3.5 py-2.5 text-sm font-semibold text-white"
          >
            New Sale
          </button>

        </div>

      </header>


      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 sm:px-6">

        <p className="text-sm text-slate-500">
          Business overview
        </p>

        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Reports
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Sales, profit and transaction details from your real shop data.
        </p>


        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">

          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

            <CalendarDays
              size={18}
              className="text-emerald-700"
            />

            Date range

          </div>


          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

            {[
              ["today", "Today"],
              ["week", "This Week"],
              ["month", "This Month"],
              ["custom", "Custom"]
            ].map(([key, label]) => (

              <button
                key={key}
                onClick={() => setRange(key)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${range === key
                  ? "bg-emerald-700 text-white"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {label}
              </button>

            ))}

          </div>


          {range === "custom" && (

            <div className="mt-4 grid gap-3 sm:grid-cols-2">

              <Field
                label="From"
                type="date"
                value={from}
                onChange={e => setFrom(e.target.value)}
              />

              <Field
                label="To"
                type="date"
                value={to}
                onChange={e => setTo(e.target.value)}
              />

            </div>

          )}

        </section>


        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">Download Reports</h2>
              <p className="mt-1 text-xs text-slate-500">
                Download reports for the selected date range.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={downloadSalesReport}
                className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Download Sales PDF
              </button>

              <button
                onClick={downloadCustomerReport}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Customer Purchase PDF
              </button>
            </div>
          </div>
        </section>


        <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">

          <div className="rounded-2xl border border-slate-200 bg-white p-4">

            <div className="text-xs text-slate-500">
              Sales
            </div>

            <div className="mt-2 text-xl font-bold">
              ₹{totalSales.toFixed(0)}
            </div>

          </div>


          <div
            className={`rounded-2xl border p-4 ${totalProfit < 0
              ? "border-red-100 bg-red-50"
              : "border-emerald-100 bg-emerald-50"
              }`}
          >

            <div
              className={`text-xs ${totalProfit < 0
                ? "text-red-700"
                : "text-emerald-700"
                }`}
            >
              Profit / Loss
            </div>

            <div
              className={`mt-2 text-xl font-bold ${totalProfit < 0
                ? "text-red-800"
                : "text-emerald-800"
                }`}
            >
              {totalProfit < 0 ? "-₹" : "₹"}
              {Math.abs(totalProfit).toFixed(0)}
            </div>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-4">

            <div className="text-xs text-slate-500">
              Items sold
            </div>

            <div className="mt-2 text-xl font-bold">
              {totalItems}
            </div>

          </div>


          <div className="rounded-2xl border border-slate-200 bg-white p-4">

            <div className="text-xs text-slate-500">
              Transactions
            </div>

            <div className="mt-2 text-xl font-bold">
              {transactionCount}
            </div>

          </div>


          <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-1">

            <div className="text-xs text-slate-500">
              Avg. sale
            </div>

            <div className="mt-2 text-xl font-bold">
              ₹{avgSale.toFixed(0)}
            </div>

          </div>

        </section>


        <div className="mt-5 grid gap-5 lg:grid-cols-2">

          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="font-semibold">
                  Daily summary
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Sales and profit by day
                </p>

              </div>

              <BarChart3
                size={19}
                className="text-emerald-700"
              />

            </div>


            {dailyRows.length === 0 ? (

              <p className="py-8 text-center text-sm text-slate-500">
                No sales in this period.
              </p>

            ) : (

              <div className="mt-3 divide-y divide-slate-100">

                {dailyRows.map(([day, v]) => (

                  <div
                    key={day}
                    className="flex items-center justify-between py-3"
                  >

                    <div>

                      <b className="text-sm">
                        {day}
                      </b>

                      <div className="text-xs text-slate-500">
                        {v.items} item{v.items === 1 ? "" : "s"}
                      </div>

                    </div>

                    <div className="text-right">

                      <b>
                        ₹{v.sales.toFixed(0)}
                      </b>

                      <div
                        className={`text-xs ${v.profit < 0
                          ? "text-red-700"
                          : "text-emerald-700"
                          }`}
                      >
                        {v.profit < 0 ? "Loss" : "Profit"}
                        {" "}
                        ₹{Math.abs(v.profit).toFixed(0)}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>


          <section className="rounded-2xl border border-slate-200 bg-white p-5">

            <div>

              <h2 className="font-semibold">
                Top products
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Highest sales in selected period
              </p>

            </div>


            {topProducts.length === 0 ? (

              <p className="py-8 text-center text-sm text-slate-500">
                No product sales yet.
              </p>

            ) : (

              <div className="mt-3 divide-y divide-slate-100">

                {topProducts.map(x => (

                  <div
                    key={x.name}
                    className="flex items-center justify-between py-3"
                  >

                    <div>

                      <b className="text-sm">
                        {x.name}
                      </b>

                      <div className="text-xs text-slate-500">
                        {x.qty} units
                      </div>

                    </div>

                    <div className="text-right">

                      <b>
                        ₹{x.sales.toFixed(0)}
                      </b>

                      <div
                        className={`text-xs ${x.profit < 0
                          ? "text-red-700"
                          : "text-emerald-700"
                          }`}
                      >
                        Profit ₹{x.profit.toFixed(0)}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        </div>


        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="font-semibold">
                Sales history
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {searched.length} transaction{searched.length === 1 ? "" : "s"} shown
              </p>

            </div>


            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 sm:w-72">

              <Search
                size={17}
                className="text-slate-400"
              />

              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search product"
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>

          </div>


          {searched.length === 0 ? (

            <div className="py-12 text-center">

              <BarChart3
                className="mx-auto text-slate-300"
                size={38}
              />

              <h3 className="mt-3 font-semibold text-slate-700">
                No sales found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another date range or search.
              </p>

            </div>

          ) : (

            <div className="mt-4 divide-y divide-slate-100">

              {searched.map(x => (

                <div
                  key={x.id}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left hover:bg-slate-50"
                >

                  <button
                    onClick={() => setSelectedSale(x)}
                    className="flex min-w-0 flex-1 items-center justify-between gap-4 text-left"
                  >

                    <div className="min-w-0">

                      <b className="text-sm sm:text-base">
                        {x.customerName || "Walk-in Customer"}
                      </b>

                      <div className="mt-1 text-sm font-medium text-slate-700">
                        {x.productName}
                      </div>

                      <div className="mt-1 text-xs text-slate-500">
                        {new Date(x.createdAt).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }
                        )}
                        {x.customerPhone ? ` • ${x.customerPhone}` : ""}
                      </div>

                    </div>


                    <div className="flex items-center gap-3 text-right">

                      <div>

                        <b>
                          ₹{x.total.toFixed(0)}
                        </b>

                        <div
                          className={`text-xs ${x.profit < 0
                            ? "text-red-700"
                            : "text-emerald-700"
                            }`}
                        >
                          {x.profit < 0 ? "Loss" : "Profit"}
                          {" "}
                          ₹{Math.abs(x.profit).toFixed(0)}
                        </div>

                      </div>

                      <span className="hidden rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 sm:block">
                        View
                      </span>

                    </div>

                  </button>


                  <button
                    onClick={() => deleteSale?.(x)}
                    className="rounded-lg border border-red-200 p-2 text-red-700 hover:bg-red-50"
                    aria-label="Delete sale"
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:items-center sm:p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">Transaction details</p>
                <h2 className="mt-1 text-2xl font-bold">
                  {selectedSale.customerName || "Walk-in Customer"}
                </h2>
                {selectedSale.customerPhone && (
                  <p className="mt-1 text-sm text-slate-500">{selectedSale.customerPhone}</p>
                )}
                {selectedSale.invoiceNo && (
                  <p className="mt-1 text-xs text-slate-400">Bill No: {selectedSale.invoiceNo}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedSale(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">Date & time</div>
              <div className="mt-1 text-sm font-semibold">
                {new Date(selectedSale.createdAt).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-semibold">Purchased items</h3>
              <div className="mt-3 divide-y divide-slate-100">
                {(selectedSale.items || []).map((item, index) => (
                  <div key={`${item.productId}-${index}`} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <b className="text-sm">{item.productName}</b>
                        <div className="mt-1 text-xs text-slate-500">
                          {item.quantity} × ₹{Number(item.salePrice || 0).toFixed(2)}
                        </div>
                      </div>
                      <b className="shrink-0">
                        ₹{Number(item.total || (item.salePrice * item.quantity) || 0).toFixed(2)}
                      </b>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Items</span>
                <b>{selectedSale.items?.length || 0}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total quantity</span>
                <b>{selectedSale.qty}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <b>₹{Number(selectedSale.subtotal || 0).toFixed(2)}</b>
              </div>
              {Number(selectedSale.discount || 0) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Discount</span>
                  <b>-₹{Number(selectedSale.discount).toFixed(2)}</b>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <span className="font-semibold">Total sale</span>
                <b className="text-lg">₹{Number(selectedSale.total || 0).toFixed(2)}</b>
              </div>
              <div className={`flex justify-between rounded-xl p-3 ${selectedSale.profit < 0 ? "bg-red-50" : "bg-emerald-50"}`}>
                <span className={selectedSale.profit < 0 ? "text-red-700" : "text-emerald-700"}>
                  {selectedSale.profit < 0 ? "Actual loss" : "Actual profit"}
                </span>
                <b className={selectedSale.profit < 0 ? "text-red-800" : "text-emerald-800"}>
                  ₹{Math.abs(Number(selectedSale.profit || 0)).toFixed(2)}
                </b>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                onClick={() => downloadHistoryBill(selectedSale)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download Bill
              </button>

              <button
                onClick={() => shareHistoryBill(selectedSale)}
                className="rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
              >
                Share Bill
              </button>

              <button
                onClick={() => shareHistoryBillWhatsApp(selectedSale)}
                className="col-span-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 font-semibold text-green-800 hover:bg-green-100"
              >
                Share on WhatsApp
              </button>

              <button
                onClick={() => setSelectedSale(null)}
                className="col-span-2 rounded-xl border border-slate-200 px-4 py-3 font-semibold"
              >
                Close
              </button>

            </div>
          </div>
        </div>
      )}

      <BottomNav
        active="Reports"
        goHome={goHome}
        goProducts={goProducts}
        goSales={goSales}
        goReports={() => { }}
      />

    </div>
  );
}


function dbToSale(row) {
  const items = (row.sale_items || []).map(item => ({
    productId: item.product_id,
    productName: item.product_name,
    quantity: Number(item.quantity || 0),
    salePrice: Number(item.sale_price || 0),
    buyPrice: Number(item.purchase_price || 0),
    total: Number(item.line_total || 0),
    profit: Number(item.line_profit || 0),
  }));

  const firstItem = items[0];

  return {
    id: row.id,

    createdAt: row.sold_at,

    customerName: row.customer_name || "Walk-in Customer",

    customerPhone: row.customer_phone || "",

    items,

    productId: firstItem?.productId || "",

    productName:
      items.length === 1
        ? firstItem.productName
        : items.length > 1
          ? `${firstItem.productName} + ${items.length - 1} more`
          : "Sale",

    code: firstItem?.productId || "",

    qty: items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ),

    salePrice:
      items.length === 1
        ? firstItem.salePrice
        : 0,

    subtotal: Number(
      row.subtotal ?? row.total ?? 0
    ),

    discount: Number(
      row.discount ?? 0
    ),

    total: Number(
      row.total ?? 0
    ),

    profit: Number(
      row.profit ?? 0
    ),

    invoiceNo:
      row.invoice_no || ""
  };
}


function App() {

  const [screen, setScreen] = useState("login");

  const [products, setProducts] = useState([]);

  const [sales, setSales] = useState([]);

  const [session, setSession] = useState(null);

  const [shopId, setShopId] = useState(null);

  const [ownerName, setOwnerName] = useState("");

  const [authLoading, setAuthLoading] = useState(true);


  const loadProducts = async (nextSession) => {

    if (!nextSession || !supabase) return;


    const {
      data: shop,
      error: shopError
    } = await supabase
      .from("shops")
      .select("id,owner_name")
      .eq(
        "owner_id",
        nextSession.user.id
      )
      .single();


    if (shopError) {
      console.error(shopError);
      return;
    }


    setShopId(shop.id);

    setOwnerName(
      shop.owner_name ||
      nextSession.user.user_metadata?.owner_name ||
      ""
    );


    const {
      data,
      error
    } = await supabase
      .from("products")
      .select(
        "id,name,code,purchase_price,selling_price,stock,is_active"
      )
      .eq("shop_id", shop.id)
      .eq("is_active", true)
      .order(
        "created_at",
        { ascending: false }
      );


    if (error) {
      console.error(error);
      setProducts([]);
      return;
    }


    setProducts(
      (data || []).map(dataToProduct)
    );


    const {
      data: saleRows,
      error: salesError
    } = await supabase
      .from("sales")
      .select(
        "id,total,profit,sold_at,invoice_no,customer_name,customer_phone,subtotal,discount,sale_items(product_id,product_name,quantity,purchase_price,sale_price,line_total,line_profit)"
      )
      .eq("shop_id", shop.id)
      .order(
        "sold_at",
        { ascending: false }
      );


    if (salesError) {

      console.error(salesError);
      setSales([]);

    } else {

      setSales(
        (saleRows || []).map(dbToSale)
      );

    }

  };


  const deleteSale = async (sale) => {

    if (!window.confirm(
      `Delete this sale of ${sale.productName}? The sold quantity will be returned to stock.`
    )) return;


    if (!supabase) return;


    const {
      error
    } = await supabase.rpc(
      "delete_sale",
      { p_sale_id: sale.id }
    );


    if (error) {
      alert(error.message);
      return;
    }


    /*
      Reload everything from Supabase.
      This is safer for multi-item bills because
      every product's stock is refreshed.
    */

    if (session) {
      await loadProducts(session);
    } else {
      setSales(
        prev =>
          prev.filter(
            x => x.id !== sale.id
          )
      );
    }

  };


  useEffect(() => {

    if (
      !supabaseConfigured ||
      !supabase
    ) {

      setAuthLoading(false);
      return;

    }


    supabase.auth
      .getSession()
      .then(async ({ data }) => {

        setSession(data.session);

        setScreen(
          data.session
            ? "dashboard"
            : "login"
        );

        if (data.session) {
          await loadProducts(
            data.session
          );
        }

        setAuthLoading(false);

      });


    const {
      data: {
        subscription
      }
    } =
      supabase.auth.onAuthStateChange(
        async (
          _event,
          nextSession
        ) => {

          setSession(nextSession);

          setScreen(
            nextSession
              ? "dashboard"
              : "login"
          );

          if (nextSession) {

            await loadProducts(
              nextSession
            );

          } else {

            setProducts([]);
            setSales([]);
            setShopId(null);
            setOwnerName("");

          }

        }
      );


    return () => subscription.unsubscribe();

  }, []);


  if (authLoading) {

    return (
      <div className="app-shell flex min-h-screen items-center justify-center">

        <div className="text-sm text-slate-500">
          Loading Muneem Ji...
        </div>

      </div>
    );

  }


  if (screen === "login") {

    return (
      <Login
        goSetup={() => setScreen("setup")}
        goDashboard={() => setScreen("dashboard")}
      />
    );

  }


  if (screen === "setup") {

    return (
      <Setup
        goLogin={() => setScreen("login")}
        done={() => setScreen("dashboard")}
      />
    );

  }


  if (screen === "products") {

    return (
      <Products
        products={products}
        setProducts={setProducts}
        shopId={shopId}
        goHome={() => setScreen("dashboard")}
        goSales={() => setScreen("sales")}
        goReports={() => setScreen("reports")}
      />
    );

  }


  if (screen === "sales") {

    return (
      <Sales
        products={products}
        setProducts={setProducts}
        sales={sales}
        setSales={setSales}
        deleteSale={deleteSale}
        goHome={() => setScreen("dashboard")}
        goProducts={() => setScreen("products")}
        goReports={() => setScreen("reports")}
      />
    );

  }


  if (screen === "reports") {

    return (
      <Reports
        sales={sales}
        deleteSale={deleteSale}
        goHome={() => setScreen("dashboard")}
        goProducts={() => setScreen("products")}
        goSales={() => setScreen("sales")}
      />
    );

  }


  const logout = async () => {

    if (supabase) {
      await supabase.auth.signOut();
    }

    setSession(null);
    setScreen("login");

  };


  return (
    <Dashboard
      products={products}
      sales={sales}
      ownerName={ownerName}
      logout={logout}
      goProducts={() => setScreen("products")}
      goSales={() => setScreen("sales")}
      goReports={() => setScreen("reports")}
    />
  );
}


ReactDOM
  .createRoot(
    document.getElementById("root")
  )
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );