import { useState } from "react";
import "./App.css";

function App() {
  const [transaksi, setTransaksi] = useState([
    { id: "1", ket: "Uang Saku", nominal: 100000, tipe: "masuk" },
    { id: "2", ket: "Beli Cilok", nominal: 10000, tipe: "keluar" },
  ]);

  const [deskripsi, setDeskripsi] = useState("");
  const [nominal, setNominal] = useState("");

  // Hitung total saldo
  const totalSaldo = transaksi.reduce((acc, item) => {
    return item.tipe === "masuk" ? acc + item.nominal : acc - item.nominal;
  }, 0);

  const tambahTransaksi = (tipe) => {
    if (!deskripsi.trim() || !nominal || isNaN(nominal) || Number(nominal) <= 0) {
      alert("Deskripsi dan nominal harus diisi dengan benar!");
      return;
    }

    const baru = {
      id: Date.now().toString(),
      ket: deskripsi.trim(),
      nominal: Number(nominal),
      tipe: tipe,
    };

    setTransaksi([baru, ...transaksi]);
    setDeskripsi("");
    setNominal("");
  };

  const hapusTransaksi = (id) => {
    setTransaksi(transaksi.filter((t) => t.id !== id));
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="app">
      {/* Header Saldo */}
      <div className="header">
        <p className="header-label">Total Saldo</p>
        <h1 className={`saldo ${totalSaldo >= 0 ? "saldo-positif" : "saldo-negatif"}`}>
          {formatRupiah(totalSaldo)}
        </h1>
        <div className="saldo-info">
          <div className="info-box masuk">
            <span>⬆ Pemasukan</span>
            <strong>
              {formatRupiah(
                transaksi
                  .filter((t) => t.tipe === "masuk")
                  .reduce((a, b) => a + b.nominal, 0)
              )}
            </strong>
          </div>
          <div className="divider-v" />
          <div className="info-box keluar">
            <span>⬇ Pengeluaran</span>
            <strong>
              {formatRupiah(
                transaksi
                  .filter((t) => t.tipe === "keluar")
                  .reduce((a, b) => a + b.nominal, 0)
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* Form Input Transaksi */}
      <div className="card form-card">
        <h2 className="section-title">Tambah Transaksi</h2>
        <div className="form-group">
          <label>Deskripsi</label>
          <input
            type="text"
            placeholder='Contoh: "Beli Makan", "Uang Bulanan"'
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nominal (Rp)</label>
          <input
            type="number"
            placeholder="Contoh: 50000"
            value={nominal}
            onChange={(e) => setNominal(e.target.value)}
            min="1"
          />
        </div>
        <div className="btn-group">
          <button className="btn btn-masuk" onClick={() => tambahTransaksi("masuk")}>
            ＋ Pemasukan
          </button>
          <button className="btn btn-keluar" onClick={() => tambahTransaksi("keluar")}>
            － Pengeluaran
          </button>
        </div>
      </div>

      {/* List History / Riwayat */}
      <div className="card">
        <h2 className="section-title">Riwayat Transaksi</h2>
        {transaksi.length === 0 ? (
          <p className="empty-state">Belum ada transaksi. Tambahkan sekarang!</p>
        ) : (
          <ul className="list-transaksi">
            {transaksi.map((item) => (
              <li key={item.id} className={`item-transaksi ${item.tipe}`}>
                <div className="item-icon">
                  {item.tipe === "masuk" ? "⬆" : "⬇"}
                </div>
                <div className="item-info">
                  <span className="item-ket">{item.ket}</span>
                  <span className="item-tipe">{item.tipe === "masuk" ? "Pemasukan" : "Pengeluaran"}</span>
                </div>
                <span className={`item-nominal ${item.tipe === "masuk" ? "hijau" : "merah"}`}>
                  {item.tipe === "masuk" ? "+" : "-"}{formatRupiah(item.nominal)}
                </span>
                <button className="btn-hapus" onClick={() => hapusTransaksi(item.id)}>✕</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
