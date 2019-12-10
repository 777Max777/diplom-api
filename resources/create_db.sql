create sequence classifications_id_seq;
create sequence requests_id_seq;
create sequence filters_id_seq;
create sequence jnd_request_filter_id_seq;
create sequence category_filters_id_seq;

CREATE TABLE category_filters
(
    id bigint NOT NULL DEFAULT nextval('category_filters_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT category_filters_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.category_filters
    OWNER to postgres;

CREATE TABLE filters
(
    id bigint NOT NULL DEFAULT nextval('filters_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    category_id bigint NOT NULL,
    CONSTRAINT filters_pkey PRIMARY KEY (id),
    CONSTRAINT filters_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.category_filters (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.filters
    OWNER to postgres;

CREATE TABLE requests
(
    id bigint NOT NULL DEFAULT nextval('requests_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    filter_id bigint,
    create_query timestamp without time zone,
    CONSTRAINT "Requests_pkey" PRIMARY KEY (id),
    CONSTRAINT requests_filter_id_fkey FOREIGN KEY (filter_id)
        REFERENCES public.filters (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.requests
    OWNER to postgres;

CREATE TABLE jnd_request_filter
(
    id bigint NOT NULL DEFAULT nextval('jnd_request_filter_id_seq'::regclass),
    request_fk bigint NOT NULL,
    filter_fk bigint NOT NULL,
    CONSTRAINT jnd_request_filter_pkey PRIMARY KEY (id),
    CONSTRAINT jnd_request_filter_filter_fk_fkey FOREIGN KEY (filter_fk)
        REFERENCES public.filters (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT jnd_request_filter_request_fk_fkey FOREIGN KEY (request_fk)
        REFERENCES public.requests (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.jnd_request_filter
    OWNER to postgres;

CREATE TABLE classifications
(id bigint NOT NULL DEFAULT nextval('classifications_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    size integer,
    request_id bigint,
    CONSTRAINT classifications_pkey PRIMARY KEY (id),
    CONSTRAINT classifications_request_id_fkey FOREIGN KEY (request_id)
        REFERENCES public.requests (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.classifications
    OWNER to postgres;