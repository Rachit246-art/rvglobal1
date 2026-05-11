import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import ServiceDetailPage from '@/components/pages/ServiceDetailPage';
import AircraftPage from '@/components/pages/AircraftPage';
import AircraftDetailPage from '@/components/pages/AircraftDetailPage';
import DestinationsPage from '@/components/pages/DestinationsPage';
import DestinationDetailPage from '@/components/pages/DestinationDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogPostPage from '@/components/pages/BlogPostPage';
import ContactPage from '@/components/pages/ContactPage';
import RealIDPage from '@/components/pages/RealIDPage';
import Chatbot from '@/components/Chatbot';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
      <Chatbot />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        children: [
          {
            index: true,
            element: <ServicesPage />,
          },
          {
            path: ":id",
            element: <ServiceDetailPage />,
          },
        ],
      },
      {
        path: "aircraft",
        children: [
          {
            index: true,
            element: <AircraftPage />,
          },
          {
            path: ":id",
            element: <AircraftDetailPage />,
          },
        ],
      },
      {
        path: "destinations",
        children: [
          {
            index: true,
            element: <DestinationsPage />,
          },
          {
            path: ":id",
            element: <DestinationDetailPage />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "blog",
        children: [
          {
            index: true,
            element: <BlogPage />,
          },
          {
            path: ":id",
            element: <BlogPostPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "real-id",
        element: <RealIDPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}
