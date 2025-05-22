// Elementos del DOM
const pedidoForm = document.getElementById('pedidoForm');
const clienteInput = document.getElementById('cliente');
const productoInput = document.getElementById('producto');
const precioInput = document.getElementById('precio');
const imagenInput = document.getElementById('imagen');
const descripcionInput = document.getElementById('descripcion');
const tablaPedidos = document.getElementById('tablaPedidos');
const pedidoIdInput = document.getElementById('pedidoId');

let pedidos = [];

try {
  const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos'));
  if (Array.isArray(pedidosGuardados)) {
    pedidos = pedidosGuardados;
  }
} catch (e) {
  pedidos = [];
}

// Renderizar tabla
function renderPedidos() {
  tablaPedidos.innerHTML = '';

  pedidos.forEach((pedido, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.producto}</td>
      <td>$${parseFloat(pedido.precio).toFixed(2)}</td>
      <td><img src="${pedido.imagen}" alt="${pedido.producto}" style="width:60px; height:60px; object-fit: cover; border-radius: 5px;"></td>
      <td>${pedido.descripcion}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarPedido(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarPedido(${index})">Eliminar</button>
      </td>
    `;
    tablaPedidos.appendChild(tr);
  });
}

// Guardar o actualizar pedido
pedidoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const cliente = clienteInput.value.trim();
  const producto = productoInput.value;
  const precio = precioInput.value.trim();
  const imagen = imagenInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  const id = pedidoIdInput.value;

  if (!cliente || !producto || !precio || !imagen || !descripcion) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (id === '') {
    pedidos.push({ cliente, producto, precio, imagen, descripcion });
  } else {
    pedidos[id] = { cliente, producto, precio, imagen, descripcion };
    pedidoIdInput.value = '';
  }

  localStorage.setItem('pedidos', JSON.stringify(pedidos));
  pedidoForm.reset();
  renderPedidos();
});

// Eliminar pedido
function eliminarPedido(index) {
  if (confirm('¿Estás seguro que deseas eliminar este pedido?')) {
    pedidos.splice(index, 1);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    renderPedidos();
  }
}

// Editar pedido
function editarPedido(index) {
  const pedido = pedidos[index];
  clienteInput.value = pedido.cliente;
  productoInput.value = pedido.producto;
  precioInput.value = pedido.precio;
  imagenInput.value = pedido.imagen;
  descripcionInput.value = pedido.descripcion;
  pedidoIdInput.value = index;
}

// Render inicial
renderPedidos();
