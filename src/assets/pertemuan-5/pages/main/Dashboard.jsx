import { FaUserFriends, FaCalendarCheck, FaUserMd, FaTooth, FaClock } from "react-icons/fa";
import { useClinic } from "../../context/ClinicContext";
// import PageHeader from "../../components/PageHeader"; // We won't use this, we'll build a custom banner

export default function Dashboard() {
  const { patients, doctors } = useClinic();

  // Statistics
  const totalPatients = patients.length;
  const appointmentsToday = patients.length; // MOCK
  const activeDoctors = doctors.filter(d => d.status === "Active").length;

  // Popular Treatments Logic
  const treatmentCounts = patients.reduce((acc, p) => {
    if (p.treatment) {
      acc[p.treatment] = (acc[p.treatment] || 0) + 1;
    }
    return acc;
  }, {});
  
  const popularTreatments = Object.entries(treatmentCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return (
    <div className="flex flex-col w-full pb-10 min-h-screen bg-gray-50/30">
      
      {/* 1. Top Banner (Hope UI Style) */}
      <div className="relative bg-gradient-to-r from-[#1A7C6E] to-[#2BB5A0] rounded-3xl px-8 pt-10 pb-24 text-white overflow-hidden">
        {/* Decorative elements for the banner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl translate-y-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hello Naufal! 👋</h1>
            <p className="text-white/80 text-sm md:text-base max-w-lg">
              We are on a mission to help you manage Nopall Dental Clinic easily and beautifully. Have a great day at work!
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            Announcements
          </button>
        </div>
      </div>

      <div className="px-8 relative -mt-14 z-20">
        {/* 2. Statistik Utama (Top Cards Overlapping Banner) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Patients */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full border-2 border-[#E8F8F6] flex items-center justify-center shrink-0">
               <div className="w-10 h-10 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center text-lg">
                 <FaUserFriends />
               </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Patients</p>
              <h3 className="text-2xl font-black text-gray-800">{totalPatients}</h3>
            </div>
          </div>

          {/* Appointments Today */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full border-2 border-blue-50 flex items-center justify-center shrink-0">
               <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                 <FaCalendarCheck />
               </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Appointments</p>
              <h3 className="text-2xl font-black text-gray-800">{appointmentsToday}</h3>
            </div>
          </div>

          {/* Active Doctors */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-full border-2 border-purple-50 flex items-center justify-center shrink-0">
               <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg">
                 <FaUserMd />
               </div>
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Active Doctors</p>
              <h3 className="text-2xl font-black text-gray-800">{activeDoctors}</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri & Tengah */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 3. Appointment Hari Ini */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Appointments Today</h2>
                <button className="text-xs font-bold text-gray-500 hover:text-[#1A7C6E] transition-colors flex items-center gap-1">
                  View All <span className="text-lg leading-none">›</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider font-bold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Jam</th>
                      <th className="px-6 py-4">Pasien</th>
                      <th className="px-6 py-4">Dokter</th>
                      <th className="px-6 py-4">Treatment</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {patients.slice(0, 5).map((p, idx) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 text-gray-500 font-medium">
                          09:{idx}0
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#E8F8F6] text-[#1A7C6E] flex items-center justify-center font-bold text-xs shrink-0">
                              {p.nama.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{p.nama}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{p.dokter || "-"}</td>
                        <td className="px-6 py-4 text-gray-600">{p.treatment || "-"}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-bold ${
                            p.status === 'Active' ? 'bg-green-50 text-green-600' : 
                            p.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                            p.status === 'Waiting' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Kolom Kanan */}
          <div className="space-y-8">
            
            {/* 4. Dokter Aktif Hari Ini */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-bold text-gray-800">Active Doctors</h2>
              </div>
              <div className="space-y-4">
                {doctors.filter(d => d.status === 'Active').map(d => (
                  <div key={d.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-50 hover:bg-gray-50 transition cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xl shrink-0">
                      {d.nama.replace("drg. ", "").charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 truncate text-sm">{d.nama}</h4>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{d.spesialis}</p>
                    </div>
                    <div className="text-[10px] font-bold text-[#1A7C6E] bg-[#E8F8F6] px-2 py-1 rounded-md flex items-center gap-1 shrink-0">
                      <FaClock /> 08:00
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Treatment Populer */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-5">Popular Treatments</h2>
              <div className="space-y-5">
                {popularTreatments.length > 0 ? popularTreatments.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                        <FaTooth className="text-sm" />
                      </div>
                      <span className="font-bold text-sm text-gray-700">{t.name}</span>
                    </div>
                    <span className="font-bold text-lg text-gray-800">{t.count}</span>
                  </div>
                )) : (
                  <p className="text-sm text-gray-400 italic">Belum ada data treatment.</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}