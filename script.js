        //  CONFIG — cambiá la URL cuando el back esté listo 
        const API_BASE = "http://localhost:3000";
        const USE_MOCK = true; // ← conectado al backend en localhost:3000

        //  ESTADO GLOBAL
        let state = {
          productoSeleccionado: null,
          cantidad: 1,
          comprador: {},
        };

        // ─────────────────────────────────────────────
      //  DATOS MOCK
      // ─────────────────────────────────────────────
      const MOCK_PRODUCTS = [
        {
          id: 1,
          nombre: "Argentina vs Brasil",
          categoria: "Eliminatoria",
          fecha: "15 de Agosto, 2026 · 21:00 hs",
          estadio: "Estadio Monumental, Buenos Aires",
          precio: 15000,
          stock: 120,
          emoji: "🇦🇷",
        },
        {
          id: 2,
          nombre: "Final Copa América",
          categoria: "Copa América 2026",
          fecha: "28 de Agosto, 2026 · 20:00 hs",
          estadio: "Hard Rock Stadium, Miami",
          precio: 38000,
          stock: 45,
          emoji: "🏆",
        },
        {
          id: 3,
          nombre: "España vs Francia",
          categoria: "Amistoso Internacional",
          fecha: "5 de Septiembre, 2026 · 18:30 hs",
          estadio: "Bernabéu, Madrid",
          precio: 22000,
          stock: 0,
          emoji: "⚽",
        },
        {
          id: 4,
          nombre: "Brasil vs Uruguay",
          categoria: "Eliminatoria",
          fecha: "12 de Septiembre, 2026 · 21:00 hs",
          estadio: "Maracaná, Río de Janeiro",
          precio: 18500,
          stock: 88,
          emoji: "🌟",
        },
        {
          id: 5,
          nombre: "Colombia vs Ecuador",
          categoria: "Eliminatoria",
          fecha: "20 de Septiembre, 2026 · 19:00 hs",
          estadio: "El Campín, Bogotá",
          precio: 12000,
          stock: 200,
          emoji: "🎯",
        },
        {
          id: 6,
          nombre: "Final Mundial FIFA 2026",
          categoria: "Mundial FIFA 2026",
          fecha: "10 de Octubre, 2026 · 17:00 hs",
          estadio: "MetLife Stadium, New Jersey",
          precio: 65000,
          stock: 30,
          emoji: "🌍",
        },
      ];

        //  NAVEGACIÓN
        /**
         * @param {number} num
         */
        function goTo(num) {
          document
            .querySelectorAll(".section")
            .forEach((s) => s.classList.remove("active"));
          document.getElementById("sec-" + (num === 4 ? "ok" : num)).classList.add("active");

          // Stepper
          for (let i = 1; i <= 3; i++) {
            const el = document.getElementById("step-" + i);
            el.classList.remove("active", "done");
            if (i < num) el.classList.add("done");
            else if (i === num) el.classList.add("active");
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // ─────────────────────────────────────────────
        //  PASO 1 — Cargar productos
        // ─────────────────────────────────────────────
        async function cargarProductos() {
          const grid = document.getElementById("tickets-grid");

          // Skeletons mientras carga
          grid.innerHTML = Array(6)
            .fill(
              `
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
          <div class="skeleton" style="height:160px;border-radius:0;"></div>
          <div style="padding:16px;">
            <div class="skeleton" style="height:12px;width:60%;margin-bottom:10px;"></div>
            <div class="skeleton" style="height:20px;width:80%;margin-bottom:8px;"></div>
            <div class="skeleton" style="height:12px;width:50%;margin-bottom:16px;"></div>
            <div class="skeleton" style="height:36px;border-radius:8px;"></div>
          </div>
        </div>`,
            )
            .join("");

          let productos;
          try {
            if (USE_MOCK) {
              // Simula delay de red
              await new Promise((r) => setTimeout(r, 800));
              productos = MOCK_PRODUCTS;
            } else {
              const res = await fetch(`${API_BASE}/productos`);
              if (!res.ok) throw new Error("Error al obtener productos");
              productos = await res.json();
            }
            renderProductos(productos);
          } catch (err) {
            grid.innerHTML = `<p style="color:var(--red);grid-column:1/-1;">Error cargando productos: ${err.message}</p>`;
          }
        }

        /**
         * @param {Array} productos
         */
        function renderProductos(productos) {
          const grid = document.getElementById("tickets-grid");
          grid.innerHTML = productos
            .map(
              (p) => `
        <div class="ticket-card" id="card-${p.id}" onclick="${p.stock > 0 ? `seleccionarProducto(${p.id})` : ""}">
          ${p.stock === 0 ? '<span class="ticket-badge agotado">Agotado</span>' : '<span class="ticket-badge">Disponible</span>'}
          <div class="ticket-img-placeholder">${p.emoji}</div>
          <div class="ticket-body">
            <div class="ticket-cat">${p.categoria}</div>
            <div class="ticket-name">${p.nombre}</div>
            <div class="ticket-date">📅 ${p.fecha}</div>
            <div class="ticket-footer">
              <div class="ticket-price">$${p.precio.toLocaleString("es-AR")}</div>
              <button class="btn-select" ${p.stock === 0 ? "disabled" : ""} onclick="event.stopPropagation();seleccionarProducto(${p.id})">
                ${p.stock === 0 ? "Agotado" : "Seleccionar"}
              </button>
            </div>
            <div class="ticket-stock" style="margin-top:8px;">${p.stock > 0 ? `${p.stock} lugares disponibles` : ""}</div>
          </div>
        </div>
      `,
            )
            .join("");
        }

        /**
         * @param {number} id
         */
        function seleccionarProducto(id) {
          state.productoSeleccionado =
            MOCK_PRODUCTS.find((p) => p.id === id) || null;
          // Highlight visual
          document
            .querySelectorAll(".ticket-card")
            .forEach((c) => c.classList.remove("selected"));
          const card = document.getElementById("card-" + id);
          if (card) card.classList.add("selected");

          // Actualizar resumen
          actualizarResumen();
          // Ir al paso 2 con pequeño delay para que se vea el highlight
          setTimeout(() => goTo(2), 250);
        }

        //  PASO 2 — Cantidad y formulario
        /**
         * @param {number} delta
         */
        function changeQty(delta) {
          state.cantidad = Math.max(1, Math.min(6, state.cantidad + delta));
          document.getElementById("qty-display").textContent = state.cantidad;
          document.getElementById("qty-minus").disabled = state.cantidad <= 1;
          document.getElementById("qty-plus").disabled = state.cantidad >= 6;
          document.getElementById("sum-cant").textContent = state.cantidad;
          actualizarTotales();
        }

        function actualizarResumen() {
          const p = state.productoSeleccionado;
          if (!p) return;
          document.getElementById("sum-evento").textContent = p.nombre;
          document.getElementById("sum-fecha").textContent = p.fecha;
          document.getElementById("sum-precio-unit").textContent =
            `$${p.precio.toLocaleString("es-AR")}`;
          actualizarTotales();
        }

        function actualizarTotales() {
          const p = state.productoSeleccionado;
          if (!p) return;
          const total = p.precio * state.cantidad;
          document.getElementById("sum-cant").textContent = state.cantidad;
          document.getElementById("sum-total").textContent =
            `$${total.toLocaleString("es-AR")}`;
        }

        function validarFormulario() {
          const campos = [
            "nombre",
            "apellido",
            "documento",
            "telefono",
            "provincia",
            "localidad",
          ];
          const mensajes = {
            nombre: "Ingresá tu nombre",
            apellido: "Ingresá tu apellido",
            documento: "Ingresá tu DNI (8 dígitos)",
            telefono: "Ingresá tu teléfono",
            provincia: "Seleccioná una provincia",
            localidad: "Ingresá tu localidad",
          };
          const validaciones = {
            documento: (v) => /^\d{7,8}$/.test(v.trim()),
            telefono: (v) => /^\d{8,15}$/.test(v.trim()),
          };

          let ok = true;
          campos.forEach((id) => {
            const el = document.getElementById(id);
            const err = document.getElementById("err-" + id);
            const val = el.value;
            let invalid = !val || val.trim() === "";
            if (!invalid && validaciones[id]) invalid = !validaciones[id](val);
            el.classList.toggle("error", invalid);
            err.textContent = invalid ? mensajes[id] : "";
            if (invalid) ok = false;
          });

          if (!ok) {
            showToast("Corregí los campos marcados en rojo");
            return;
          }

          // Guardar en estado
          state.comprador = {
            nombre: document.getElementById("nombre").value.trim(),
            apellido: document.getElementById("apellido").value.trim(),
            documento: document.getElementById("documento").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            provincia: document.getElementById("provincia").value,
            localidad: document.getElementById("localidad").value.trim(),
          };

          llenarRevision();
          goTo(3);
        }

        // ─────────────────────────────────────────────
        //  PASO 3 — Revisión y pago
        // ─────────────────────────────────────────────
        function llenarRevision() {
          const p = state.productoSeleccionado;
          const c = state.comprador;
          const total = p.precio * state.cantidad;

          document.getElementById("rev-evento").textContent = p.nombre;
          document.getElementById("rev-fecha").textContent = p.fecha;
          document.getElementById("rev-estadio").textContent = p.estadio;
          document.getElementById("rev-cant").textContent =
            `${state.cantidad} g${state.cantidad > 1 ? "s" : ""}`;
          document.getElementById("rev-precio").textContent =
            `$${p.precio.toLocaleString("es-AR")}`;
          document.getElementById("rev-nombre").textContent =
            `${c.nombre} ${c.apellido}`;
          document.getElementById("rev-doc").textContent = c.documento;
          document.getElementById("rev-tel").textContent = c.telefono;
          document.getElementById("rev-prov").textContent = c.provincia;
          document.getElementById("rev-loc").textContent = c.localidad;
          document.getElementById("mp-total").textContent =
            `$${total.toLocaleString("es-AR")}`;
        }

        async function procesarPago() {
          const btn = document.getElementById("btn-pagar");
          btn.innerHTML = '<span class="spinner"></span> Procesando...';
          btn.disabled = true;

          const p = state.productoSeleccionado;
          const payload = {
            productoId: p.id,
            nombreProducto: p.nombre,
            precio: p.precio,
            cantidad: state.cantidad,
            total: p.precio * state.cantidad,
            comprador: state.comprador,
          };

          try {
            if (USE_MOCK) {
              // Simula llamada al back + redirect MP
              await new Promise((r) => setTimeout(r, 1500));
              console.log("[MOCK] Payload enviado al back:", payload);
              // Cuando el back esté listo, esto será:
              // const res = await fetch(`${API_BASE}/comprar-ticket`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
              // const data = await res.json();
              // window.location.href = data.urlPago; // redirect a MP
              goTo(4);
            } else {
              const res = await fetch(`${API_BASE}/comprar-ticket`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error("Error al procesar el pago");
              const data = await res.json();
              // Si el back devuelve una URL de MP, redirigir:
              if (data.urlPago) {
                window.location.href = data.urlPago;
              } else {
                goTo(4);
              }
            }
          } catch (err) {
            showToast("Error al procesar el pago: " + err.message);
            btn.innerHTML = "Pagar con Mercado Pago";
            btn.disabled = false;
          }
        }

        // ─────────────────────────────────────────────
        //  UTILIDADES
        // ─────────────────────────────────────────────
        function showToast(msg) {
          const t = document.getElementById("toast");
          t.textContent = msg;
          t.classList.add("show");
          setTimeout(() => t.classList.remove("show"), 3500);
        }

        // ─────────────────────────────────────────────
        //  INIT
        // ─────────────────────────────────────────────
        document.addEventListener("DOMContentLoaded", function() {
          cargarProductos();
        });

        window.goTo = goTo;
        window.seleccionarProducto = seleccionarProducto;
        window.changeQty = changeQty;
        window.validarFormulario = validarFormulario;
        window.procesarPago = procesarPago;