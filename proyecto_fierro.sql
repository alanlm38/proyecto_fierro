--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: proyecto_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO proyecto_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: proyecto_user
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100),
    price double precision,
    availability boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.products OWNER TO proyecto_user;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: proyecto_user
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO proyecto_user;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: proyecto_user
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: proyecto_user
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: proyecto_user
--

COPY public.products (id, name, price, availability, "createdAt", "updatedAt") FROM stdin;
1	Doritos	399	f	2025-05-28 00:49:38.71-06	2025-05-30 13:23:58.665-06
2	Luislao	8	t	2025-05-30 13:22:16.968-06	2025-05-30 13:24:05.301-06
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: proyecto_user
--

SELECT pg_catalog.setval('public.products_id_seq', 2, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: proyecto_user
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

