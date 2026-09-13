"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  Wallet,
  CreditCard,
  Calendar,
  Eye,
  Loader2,
  X,
  User,
  Users,
  Mail,
  Phone,
  Hash,
  FolderKanban,
  Globe,
} from "lucide-react";
import { error } from "better-auth/api";



const DONATIONS_API = "/api/donations";
const PROJECT_API = "/api/programProjectpage"
const DONORS_API = "/api/donorspage"
const UNIQUE_VISITORS_API = "/api/visitors"




export default function Dashboard() {

  const [donations, setDonations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [volunteer, setVolunteer] = useState([]);
  const [uniqueVisitors, setUniqueVisitors] = useState(0);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedDonation, setSelectedDonation] = useState(null);

  console.log(selectedDonation)


 

  useEffect(() => {

    const fetchDonations = async () => {

      try {

        setLoading(true);

        const response = await fetch(DONATIONS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data = await response.json();

       

        if (Array.isArray(data)) {
          setDonations(data);
        } else if (Array.isArray(data.donations)) {
          setDonations(data.donations);
        } else {
          setDonations([]);
        }

      } catch (error) {

        console.error("Donation fetch error:", error);

        setDonations([]);

      } finally {

        setLoading(false);

      }

    };


    fetchDonations();

  }, []);



  useEffect(() => {


    const fetchProject = async () => {

      try {
        setLoading(true);
        const response = await fetch(PROJECT_API);

        if (!response.ok) {
          throw new Error("Failed to fetch Project")
        }

        const data = await response.json();

        setProjects(data.currentProjects.items)

      } catch (error) {
        console.eror("Project Fetch error: ", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchProject();


  }, [])




  useEffect(() => {


    const fetchVolunteer = async () => {

      try {
        setLoading(true);
        const response = await fetch(DONORS_API);

        if (!response.ok) {
          throw new Error("Failed to Donors")
        }

        const data = await response.json();

        setVolunteer(data.donors.items)

      } catch (error) {
        console.eror("Project Fetch error: ", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchVolunteer();


  }, [])




  useEffect(() => {


    const fetchUniqueVisitors = async () => {

      try {
        setLoading(true);
        const response = await fetch(UNIQUE_VISITORS_API);

        if (!response.ok) {
          throw new Error("Failed to fetch Unique Vsitors")
        }

        const data = await response.json();

        setUniqueVisitors(data.totalVisitors)

      } catch (error) {
        console.eror("Project Fetch error: ", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchUniqueVisitors();


  }, [])




 

  const filteredDonations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return donations;
    }

    return donations.filter((donation) => {
      const donorName = getDonorName(donation).toLowerCase();
      const email = (donation.email || "").toLowerCase();
      const transactionId = (
        donation.transaction_uuid ||
        donation.transactionId ||
        donation.transaction_id ||
        ""
      ).toLowerCase();

      return (
        donorName.includes(query) ||
        email.includes(query) ||
        transactionId.includes(query)
      );
    });
  }, [donations, search]);


 

  const totalDonations = useMemo(() => {
    return donations.reduce(
      (total, donation) =>
        total + Number(donation.amount || 0),
      0
    );
  }, [donations]);




 

  const activities = [
    "Homepage updated",
    "New donation received",
    "Gallery image uploaded",
    "Volunteer added",
  ];


 

  return (

    <div className="min-h-screen w-full md:w-[80%]">

      {/* =================================================
                MAIN
            ================================================= */}

      <main className="flex flex-1 flex-col">


        {/* =================================================
                    NAVBAR
                ================================================= */}

        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-5">

          <div className="relative left-12 md:left-0">

            <h2 className="text-2xl font-semibold">
              Dashboard
            </h2>

            <p className="text-sm text-gray-500">
              Welcome back, Admin
            </p>

          </div>


          <div className="flex items-center gap-4">




          </div>

        </header>


        {/* =================================================
                    CONTENT
                ================================================= */}

        <div className="flex flex-col gap-6 p-8">


          {/* =================================================
                        STATS
                    ================================================= */}

          <div className="flex flex-wrap gap-6">

            <StatCard
              title="Total Donations"
              value={`NPR ${formatAmount(totalDonations)}`}
              icon={<Wallet size={20} />}
              iconClass="bg-sky-50 text-sky-600"
            />

            <StatCard
              title="Active Projects"
              value={projects.length}
              icon={<FolderKanban size={20} />}
              iconClass="bg-purple-50 text-purple-600"
            />

            <StatCard
              title="Volunteers"
              value={volunteer.length}
              icon={<Users size={20} />}
              iconClass="bg-green-50 text-green-600"
            />

            <StatCard
              title="Website Visitors"
              value={uniqueVisitors}
              icon={<Globe size={20} />}
              iconClass="bg-orange-50 text-orange-600"
            />

          </div>


          {/* =================================================
                        MAIN GRID
                    ================================================= */}

          <div className="flex flex-col gap-6 lg:flex-row">


            {/* =================================================
                            DONATION TABLE
                        ================================================= */}

            <div className="min-w-0 flex-1">

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white h-full">


                {/* =================================================
                                    TOOLBAR
                                ================================================= */}

                <div className="flex flex-col gap-4 border-b border-gray-200 p-5">


                  {/* Search */}

                  <div className="relative w-full">

                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search donors, email or transaction..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />

                  </div>




                </div>


                {/* =================================================
                                    LOADING
                                ================================================= */}

                {loading ? (

                  <div className="flex min-h-[450px] items-center justify-center">

                    <div className="flex flex-col items-center gap-3">

                      <Loader2
                        size={28}
                        className="animate-spin text-sky-500"
                      />

                      <p className="text-sm text-gray-500">
                        Loading donations...
                      </p>

                    </div>

                  </div>

                ) : filteredDonations.length === 0 ? (

                 

                  <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">

                      <Wallet size={25} />

                    </div>


                    <h3 className="mt-4 text-base font-semibold text-gray-900">

                      {search.trim()
                        ? "No donations found"
                        : "No donations yet"}

                    </h3>


                    <p className="mt-1 max-w-sm text-sm text-gray-500">

                      {search.trim()
                        ? "Try changing your search."
                        : "Donations received through the website will appear here."}

                    </p>

                  </div>

                ) : (

                 

                  <div className="overflow-x-auto">

                    <table className="w-full">


                      {/* TABLE HEADER */}

                      <thead>

                        <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wide text-gray-400">

                          <th className="px-5 py-4">
                            Donor
                          </th>

                          <th className="px-2 py-4">
                            Amount
                          </th>

                          <th className="px-5 py-4">
                            Payment
                          </th>

                          <th className="px-2 py-4">
                            Date
                          </th>



                        </tr>

                      </thead>


                      {/* TABLE BODY */}

                      <tbody className="divide-y divide-gray-100">

                        {filteredDonations.map(
                          (donation) => {

                            const id =
                              getDonationId(
                                donation
                              );

                            return (

                              <tr
                                key={id}
                                className="transition hover:bg-gray-50 hover:cursor-pointer"
                                onClick={() =>
                                  setSelectedDonation(
                                    donation
                                  )
                                }
                              >


                                {/* =================================================
                                                                    DONOR
                                                                ================================================= */}

                                <td className="px-5 py-4">

                                  <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-600">

                                      {getInitial(
                                        donation
                                      )}

                                    </div>


                                    <div className="min-w-0">

                                      <p className="truncate text-sm font-medium text-gray-900">

                                        {getDonorName(
                                          donation
                                        )}

                                      </p>


                                      <p className="truncate text-xs text-gray-500">

                                        {donation.email ||
                                          "No email"}

                                      </p>

                                    </div>

                                  </div>

                                </td>


                                {/* =================================================
                                                                    AMOUNT
                                                                ================================================= */}

                                <td className="px-2 py-4">

                                  <span className="text-sm font-semibold text-gray-900">

                                    NPR{" "}

                                    {formatAmount(
                                      donation.amount
                                    )}

                                  </span>

                                </td>


                                {/* =================================================
                                                                    PAYMENT
                                                                ================================================= */}

                                <td className="px-5 py-4">

                                  <div className="flex items-center gap-2 text-sm text-gray-700">

                                    <CreditCard
                                      size={15}
                                      className="text-gray-400"
                                    />

                                    {getPaymentMethod(
                                      donation
                                    )}

                                  </div>

                                </td>




                                {/* =================================================
                                                                    DATE
                                                                ================================================= */}

                                <td className="px-2 py-4">

                                  <div className="flex items-center gap-2 text-sm text-gray-500">

                                    <Calendar
                                      size={14}
                                    />

                                    {formatDate(
                                      donation.createdAt
                                    )}

                                  </div>

                                </td>


                                {/* =================================================
                                                                    ACTION
                                                                ================================================= */}


                              </tr>

                            );

                          }
                        )}

                      </tbody>

                    </table>

                  </div>

                )}


                {/* =================================================
                                    RESULT COUNT
                                ================================================= */}

                {!loading &&
                  filteredDonations.length > 0 && (

                    <div className="border-t border-gray-100 px-5 py-3">

                      <p className="text-xs text-gray-400">

                        Showing{" "}

                        {filteredDonations.length}

                        {" "}of{" "}

                        {donations.length}

                        {" "}donations

                      </p>

                    </div>

                  )}

              </div>

            </div>


            {/* =================================================
                            RIGHT SIDEBAR
                        ================================================= */}

            <div className="flex w-full shrink-0 flex-col gap-6 lg:w-80">


              {/* =================================================
                                QUICK ACTIONS
                            ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <h3 className="mb-5 text-lg font-semibold">
                  Quick Actions
                </h3>


                <div className="flex flex-col gap-3">

                  <button className="rounded-xl bg-sky-500 py-3 text-white transition hover:bg-sky-600">

                    Add Project

                  </button>


                  <button className="rounded-xl border border-gray-200 py-3 transition hover:bg-gray-50">

                    Upload Gallery

                  </button>


                  <Link href="/dashboard/homepage">
                    <button className="w-full rounded-xl border border-gray-200 py-3 transition hover:bg-gray-50 hover:cursor-pointer">

                      Edit Homepage

                    </button>
                  </Link>

                </div>

              </div>


              {/* =================================================
                                RECENT ACTIVITY
                            ================================================= */}

              <div className="rounded-2xl border border-gray-200 bg-white p-6">

                <h3 className="mb-5 text-lg font-semibold">
                  Recent Activity
                </h3>


                <div className="flex flex-col gap-4">

                  {activities.map(
                    (activity) => (

                      <div
                        key={activity}
                        className="border-b border-gray-100 pb-3 last:border-0"
                      >

                        <p className="text-sm text-gray-700">
                          {activity}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* =================================================
                DONATION DETAILS MODAL
            ================================================= */}

      {selectedDonation && (

        <DonationModal
          donation={selectedDonation}
          onClose={() =>
            setSelectedDonation(null)
          }
        />

      )}

    </div>

  );

}




function StatCard({
  title,
  value,
  icon,
  iconClass,
}) {

  return (

    <div className="flex min-w-[220px] flex-1 flex-col rounded-2xl border border-gray-200 bg-white p-5">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-gray-900">
            {value}
          </h2>

        </div>


        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}









function DonationModal({
  donation,
  onClose,
}) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">


      {/* Overlay */}

      <div
        className="absolute inset-0"
        onClick={onClose}
      />


      {/* Modal */}

      <div className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">


        {/* =================================================
                    HEADER
                ================================================= */}

        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-xl font-semibold text-gray-900">
                Donation Details
              </h2>



            </div>


            <p className="mt-1 text-sm text-gray-500">

              {formatDateTime(
                donation.createdAt
              )}

            </p>

          </div>


          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >

            <X size={20} />

          </button>

        </div>


        {/* =================================================
                    BODY
                ================================================= */}

        <div className="max-h-[65vh] overflow-y-auto px-6 py-6">


          {/* Amount */}

          <div className="rounded-2xl bg-sky-50 p-5 text-center">

            <p className="text-sm text-sky-600">
              Donation Amount
            </p>

            <p className="mt-1 text-3xl font-semibold text-gray-900">

              NPR{" "}

              {formatAmount(
                donation.amount
              )}

            </p>

          </div>


          {/* =================================================
                        DONOR
                    ================================================= */}

          <div className="mt-6">

            <h3 className="text-sm font-semibold text-gray-900">
              Donor Information
            </h3>


            <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">

              <DetailRow
                icon={<User size={16} />}
                label="Full Name"
                value={getDonorName(
                  donation
                )}
              />


              <DetailRow
                icon={<Mail size={16} />}
                label="Email"
                value={
                  donation.email ||
                  "Not provided"
                }
              />


              <DetailRow
                icon={<Phone size={16} />}
                label="Phone"
                value={
                  donation.phone ||
                  donation.number ||
                  "Not provided"
                }
              />

            </div>

          </div>


          {/* =================================================
                        PAYMENT
                    ================================================= */}

          <div className="mt-6">

            <h3 className="text-sm font-semibold text-gray-900">
              Payment Information
            </h3>


            <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">

              <DetailRow
                icon={<CreditCard size={16} />}
                label="Payment Method"
                value={getPaymentMethod(
                  donation
                )}
              />


              <DetailRow
                icon={<Hash size={16} />}
                label="Transaction ID"
                value={
                  donation.transactionUuid ||
                  "Not available"
                }
                breakValue
              />


              <DetailRow
                icon={<Calendar size={16} />}
                label="Date"
                value={formatDateTime(
                  donation.createdAt
                )}
              />

            </div>

          </div>

        </div>


        {/* =================================================
                    FOOTER
                ================================================= */}

        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">

          <button
            onClick={onClose}
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}




function DetailRow({
  icon,
  label,
  value,
  breakValue = false,
}) {

  return (

    <div className="flex gap-4 px-4 py-3.5">

      <div className="mt-0.5 shrink-0 text-gray-400">
        {icon}
      </div>


      <div className="min-w-0 flex-1">

        <p className="text-xs text-gray-400">
          {label}
        </p>


        <p
          className={`mt-1 text-sm font-medium text-gray-800 ${breakValue
            ? "break-all"
            : ""
            }`}
        >

          {value}

        </p>

      </div>

    </div>

  );

}




function getDonationId(donation) {

  if (!donation?._id) {
    return Math.random().toString();
  }


  if (typeof donation._id === "string") {
    return donation._id;
  }


  if (donation._id.$oid) {
    return donation._id.$oid;
  }


  return String(donation._id);

}




function getDonorName(donation) {

  return (
    donation.fullName ||
    donation.donorName ||
    "Anonymous Donor"
  );

}




function getInitial(donation) {

  const name = getDonorName(donation);


  if (name === "Anonymous Donor") {
    return "A";
  }


  return name
    .charAt(0)
    .toUpperCase();

}




function getPaymentMethod(donation) {

  return (
    donation.paymentMethod ||
    donation.payment_method ||
    donation.method ||
    "eSewa"
  );

}




function formatAmount(amount) {

  const number =
    Number(amount || 0);


  return number.toLocaleString(
    "en-NP"
  );

}




function formatDate(dateValue) {

  if (!dateValue) {
    return "Unknown";
  }


  const date =
    new Date(dateValue);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown";
  }


  return date.toLocaleDateString(
    "en-NP",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

}




function formatDateTime(dateValue) {

  if (!dateValue) {
    return "Unknown";
  }


  const date =
    new Date(dateValue);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown";
  }


  return date.toLocaleString(
    "en-NP",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );

}