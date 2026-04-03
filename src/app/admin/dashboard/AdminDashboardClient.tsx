"use client";

import { useState, useTransition } from "react";

import { Product, SiteContent } from "@/lib/types";

type AdminDashboardClientProps = {
  initialProducts: Product[];
  initialContent: SiteContent;
};

type ProductFormState = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
  size: string;
  finish: string;
  featured: boolean;
  image: string;
  galleryText: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  location: string;
};

const emptyProduct: ProductFormState = {
  id: "",
  name: "",
  category: "Azulejos",
  brand: "HISPACENSA",
  price: 0,
  originalPrice: 0,
  stock: 0,
  sku: "",
  size: "",
  finish: "",
  featured: false,
  image: "",
  galleryText: "",
  description: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  location: "Santa Tecla, La Libertad, El Salvador"
};

function toPrettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function AdminDashboardClient({
  initialProducts,
  initialContent
}: AdminDashboardClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const [content, setContent] = useState(initialContent);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProduct);
  const [heroPromosJson, setHeroPromosJson] = useState(toPrettyJson(initialContent.home.heroPromos));
  const [categoryCardsJson, setCategoryCardsJson] = useState(
    toPrettyJson(initialContent.home.categoryCards)
  );
  const [storyGalleryJson, setStoryGalleryJson] = useState(
    toPrettyJson(initialContent.home.storyGalleryImages)
  );
  const [aboutValuesJson, setAboutValuesJson] = useState(toPrettyJson(initialContent.about.values));
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "products">("content");
  const [isPending, startTransition] = useTransition();

  const totalInventoryValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);

  function parseJsonField<T>(value: string, fieldName: string) {
    try {
      return JSON.parse(value) as T;
    } catch {
      throw new Error(`Formato invalido en ${fieldName}.`);
    }
  }

  async function uploadFile(file: File) {
    const payload = new FormData();
    payload.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: payload
    });

    if (!response.ok) {
      throw new Error("upload_failed");
    }

    return (await response.json()) as { url: string };
  }

  async function refreshProducts() {
    const response = await fetch("/api/site/products");
    const data = (await response.json()) as Product[];
    setProducts(data);
  }

  async function refreshContent() {
    const response = await fetch("/api/admin/content");
    const data = (await response.json()) as SiteContent;
    setContent(data);
    setHeroPromosJson(toPrettyJson(data.home.heroPromos));
    setCategoryCardsJson(toPrettyJson(data.home.categoryCards));
    setStoryGalleryJson(toPrettyJson(data.home.storyGalleryImages));
    setAboutValuesJson(toPrettyJson(data.about.values));
  }

  function fillProductForm(product: Product) {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice ?? 0,
      stock: product.stock,
      sku: product.sku,
      size: product.size,
      finish: product.finish,
      featured: product.featured,
      image: product.image,
      galleryText: product.gallery.join("\n"),
      description: product.description,
      seoTitle: product.seoTitle,
      seoDescription: product.seoDescription,
      keywords: product.keywords.join(", "),
      location: product.location
    });
    setActiveTab("products");
  }

  async function handleProductUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const data = await uploadFile(file);
      setProductForm((current) => ({
        ...current,
        image: data.url,
        galleryText: current.galleryText || data.url
      }));
      setMessage(`Imagen subida: ${data.url}`);
    } catch {
      setMessage("No se pudo subir la imagen.");
    }
  }

  async function handleContentImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    assign: (url: string) => void
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const data = await uploadFile(file);
      assign(data.url);
      setMessage(`Imagen subida: ${data.url}`);
    } catch {
      setMessage("No se pudo subir la imagen.");
    }
  }

  async function handleContentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(() => {
      void (async () => {
        let nextContent: SiteContent;

        try {
          nextContent = {
            ...content,
            home: {
              ...content.home,
              heroPromos: parseJsonField(heroPromosJson, "banners principales"),
              categoryCards: parseJsonField(categoryCardsJson, "tarjetas de categorias"),
              storyGalleryImages: parseJsonField(storyGalleryJson, "galeria del home")
            },
            about: {
              ...content.about,
              values: parseJsonField(aboutValuesJson, "valores de quienes somos")
            }
          };
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "No se pudo validar el contenido.");
          return;
        }

        const response = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nextContent)
        });

        if (!response.ok) {
          setMessage("No se pudo guardar el contenido del sitio.");
          return;
        }

        await refreshContent();
        setMessage("Contenido del sitio actualizado.");
      })();
    });
  }

  async function handleProductSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(() => {
      void (async () => {
        const gallery = productForm.galleryText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean);

        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productForm,
            gallery,
            keywords: productForm.keywords,
            price: Number(productForm.price),
            originalPrice: Number(productForm.originalPrice),
            stock: Number(productForm.stock)
          })
        });

        if (!response.ok) {
          setMessage("No se pudo guardar el producto.");
          return;
        }

        await refreshProducts();
        setProductForm({ ...emptyProduct });
        setMessage("Producto guardado correctamente.");
      })();
    });
  }

  function handleDelete(id: string) {
    setMessage("");

    startTransition(() => {
      void (async () => {
        const response = await fetch("/api/admin/products", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        });

        if (!response.ok) {
          setMessage("No se pudo eliminar el producto.");
          return;
        }

        await refreshProducts();
        setMessage("Producto eliminado.");
      })();
    });
  }

  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard__intro">
        <div className="admin-metric">
          <span>Productos</span>
          <strong>{products.length}</strong>
        </div>
        <div className="admin-metric">
          <span>Inventario total</span>
          <strong>${totalInventoryValue.toLocaleString("en-US", { maximumFractionDigits: 2 })}</strong>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="button button--ghost" type="submit">
            Cerrar sesion
          </button>
        </form>
      </section>

      <section className="admin-tabs">
        <button
          className={activeTab === "content" ? "admin-tab is-active" : "admin-tab"}
          type="button"
          onClick={() => setActiveTab("content")}
        >
          Contenido del sitio
        </button>
        <button
          className={activeTab === "products" ? "admin-tab is-active" : "admin-tab"}
          type="button"
          onClick={() => setActiveTab("products")}
        >
          Productos y precios
        </button>
      </section>

      {activeTab === "content" ? (
        <form className="admin-form admin-form--panel admin-form--wide" onSubmit={handleContentSubmit}>
          <div className="admin-form__header">
            <h2>Contenido editable</h2>
            <p>Edita textos, banners, contacto y secciones del home sin tocar codigo.</p>
          </div>

          <div className="admin-section">
            <h3>Contacto y encabezado</h3>
            <div className="admin-form__row">
              <label>
                Franja superior
                <input
                  value={content.business.topStripText}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, topStripText: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                Texto del boton superior
                <input
                  value={content.business.topStripLinkLabel}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, topStripLinkLabel: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Telefono principal
                <input
                  value={content.business.phone}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, phone: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                Telefono secundario
                <input
                  value={content.business.secondaryPhone}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, secondaryPhone: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                WhatsApp
                <input
                  value={content.business.whatsappUrl}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, whatsappUrl: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                Correo
                <input
                  value={content.business.email}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, email: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Texto boton header
                <input
                  value={content.business.headerButtonLabel}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, headerButtonLabel: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                URL de mapa
                <input
                  value={content.business.mapUrl}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      business: { ...current.business, mapUrl: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <label>
              Direccion
              <textarea
                rows={2}
                value={content.business.address}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    business: { ...current.business, address: event.target.value }
                  }))
                }
              />
            </label>
          </div>

          <div className="admin-section">
            <h3>Imagenes principales</h3>
            <div className="admin-form__row">
              <label>
                Titulo Quienes Somos
                <input
                  value={content.about.heroTitle}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      about: { ...current.about, heroTitle: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                Titulo Contacto
                <input
                  value={content.contact.heroTitle}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      contact: { ...current.contact, heroTitle: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Hero Quienes Somos
                <input
                  value={content.about.heroImage}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      about: { ...current.about, heroImage: event.target.value }
                    }))
                  }
                />
              </label>
              <label>
                Hero Contacto
                <input
                  value={content.contact.heroImage}
                  onChange={(event) =>
                    setContent((current) => ({
                      ...current,
                      contact: { ...current.contact, heroImage: event.target.value }
                    }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Subir imagen para Quienes Somos
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    void handleContentImageUpload(event, (url) =>
                      setContent((current) => ({
                        ...current,
                        about: { ...current.about, heroImage: url }
                      }))
                    )
                  }
                />
              </label>
              <label>
                Subir imagen para Contacto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    void handleContentImageUpload(event, (url) =>
                      setContent((current) => ({
                        ...current,
                        contact: { ...current.contact, heroImage: url }
                      }))
                    )
                  }
                />
              </label>
            </div>
          </div>

          <div className="admin-section">
            <h3>Banners y tarjetas complejas en JSON</h3>
            <label>
              Banners principales del home
              <textarea rows={16} value={heroPromosJson} onChange={(event) => setHeroPromosJson(event.target.value)} />
            </label>
            <label>
              Tarjetas de categorias del home
              <textarea
                rows={16}
                value={categoryCardsJson}
                onChange={(event) => setCategoryCardsJson(event.target.value)}
              />
            </label>
            <label>
              Galeria del home
              <textarea
                rows={8}
                value={storyGalleryJson}
                onChange={(event) => setStoryGalleryJson(event.target.value)}
              />
            </label>
            <label>
              Valores de Quienes Somos
              <textarea
                rows={12}
                value={aboutValuesJson}
                onChange={(event) => setAboutValuesJson(event.target.value)}
              />
            </label>
          </div>

          <div className="admin-section">
            <h3>Textos comerciales</h3>
            <label>
              Titulo de productos en home
              <input
                value={content.home.introDescription}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    home: { ...current.home, introDescription: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Titulo de historia en home
              <input
                value={content.home.storyTitle}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    home: { ...current.home, storyTitle: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Subtitulo de historia en home
              <input
                value={content.home.storySubtitle}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    home: { ...current.home, storySubtitle: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Parrafo 1 del home
              <textarea
                rows={3}
                value={content.home.storyParagraphs[0] ?? ""}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    home: {
                      ...current.home,
                      storyParagraphs: [event.target.value, current.home.storyParagraphs[1] ?? ""]
                    }
                  }))
                }
              />
            </label>
            <label>
              Parrafo 2 del home
              <textarea
                rows={3}
                value={content.home.storyParagraphs[1] ?? ""}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    home: {
                      ...current.home,
                      storyParagraphs: [current.home.storyParagraphs[0] ?? "", event.target.value]
                    }
                  }))
                }
              />
            </label>
            <label>
              Titulo CTA principal
              <input
                value={content.cta.title}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    cta: { ...current.cta, title: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Descripcion CTA principal
              <textarea
                rows={3}
                value={content.cta.description}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    cta: { ...current.cta, description: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Descripcion del footer
              <textarea
                rows={2}
                value={content.business.footerDescription}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    business: { ...current.business, footerDescription: event.target.value }
                  }))
                }
              />
            </label>
            <label>
              Copyright
              <input
                value={content.footer.copyright}
                onChange={(event) =>
                  setContent((current) => ({
                    ...current,
                    footer: { ...current.footer, copyright: event.target.value }
                  }))
                }
              />
            </label>
          </div>

          <button className="button button--primary" type="submit" disabled={isPending}>
            {isPending ? "Guardando..." : "Guardar contenido del sitio"}
          </button>
          {message ? <p className="admin-message">{message}</p> : null}
        </form>
      ) : (
        <section className="admin-grid">
          <form className="admin-form admin-form--panel" onSubmit={handleProductSubmit}>
            <div className="admin-form__header">
              <h2>Gestion de productos</h2>
              <p>Crea o actualiza productos visibles en la web publica.</p>
            </div>

            <label>
              Nombre del producto
              <input
                value={productForm.name}
                onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
            </label>

            <div className="admin-form__row">
              <label>
                Categoria
                <input
                  value={productForm.category}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, category: event.target.value }))
                  }
                  required
                />
              </label>
              <label>
                Marca
                <input
                  value={productForm.brand}
                  onChange={(event) => setProductForm((current) => ({ ...current, brand: event.target.value }))}
                  required
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Precio
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.price}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, price: Number(event.target.value) }))
                  }
                  required
                />
              </label>
              <label>
                Precio anterior
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={productForm.originalPrice}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, originalPrice: Number(event.target.value) }))
                  }
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  value={productForm.stock}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, stock: Number(event.target.value) }))
                  }
                  required
                />
              </label>
              <label>
                SKU
                <input
                  value={productForm.sku}
                  onChange={(event) => setProductForm((current) => ({ ...current, sku: event.target.value }))}
                  required
                />
              </label>
            </div>

            <div className="admin-form__row">
              <label>
                Formato
                <input
                  value={productForm.size}
                  onChange={(event) => setProductForm((current) => ({ ...current, size: event.target.value }))}
                  required
                />
              </label>
              <label>
                Acabado
                <input
                  value={productForm.finish}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, finish: event.target.value }))
                  }
                  required
                />
              </label>
            </div>

            <label>
              URL de imagen principal
              <input
                value={productForm.image}
                onChange={(event) => setProductForm((current) => ({ ...current, image: event.target.value }))}
                required
              />
            </label>
            <label>
              Subir imagen
              <input type="file" accept="image/*" onChange={handleProductUpload} />
            </label>
            <label>
              URLs de galeria, una por linea
              <textarea
                rows={3}
                value={productForm.galleryText}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, galleryText: event.target.value }))
                }
              />
            </label>
            <label>
              Descripcion
              <textarea
                rows={4}
                value={productForm.description}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, description: event.target.value }))
                }
                required
              />
            </label>
            <label>
              SEO Title
              <input
                value={productForm.seoTitle}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, seoTitle: event.target.value }))
                }
                required
              />
            </label>
            <label>
              SEO Description
              <textarea
                rows={3}
                value={productForm.seoDescription}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, seoDescription: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Keywords
              <input
                value={productForm.keywords}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, keywords: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Ubicacion SEO
              <input
                value={productForm.location}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, location: event.target.value }))
                }
                required
              />
            </label>
            <label className="admin-form__checkbox">
              <input
                type="checkbox"
                checked={productForm.featured}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              Mostrar en destacados
            </label>

            <div className="admin-actions">
              <button className="button button--primary" type="submit" disabled={isPending}>
                {isPending ? "Guardando..." : "Guardar producto"}
              </button>
              <button className="button button--ghost" type="button" onClick={() => setProductForm(emptyProduct)}>
                Limpiar
              </button>
            </div>

            {message ? <p className="admin-message">{message}</p> : null}
          </form>

          <section className="admin-list">
            <div className="admin-form__header">
              <h2>Inventario publicado</h2>
              <p>Usa editar para traer el producto al formulario.</p>
            </div>

            {products.map((product) => (
              <article key={product.id} className="admin-list__item">
                <div>
                  <strong>{product.name}</strong>
                  <p>
                    {product.category} | {product.brand} | ${product.price.toFixed(2)} | Stock {product.stock}
                  </p>
                </div>
                <div className="admin-list__actions">
                  <button className="button button--ghost" type="button" onClick={() => fillProductForm(product)}>
                    Editar
                  </button>
                  <button className="button button--danger" type="button" onClick={() => handleDelete(product.id)}>
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </section>
        </section>
      )}
    </div>
  );
}
