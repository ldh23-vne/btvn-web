        // Hàm JavaScript gọi API bằng Fetch
        async function loadData() {
            const loading = document.getElementById('loading');
            const table = document.getElementById('studentTable');
            const tbody = document.getElementById('studentData');

            loading.style.display = 'block';
            table.style.display = 'none';
            tbody.innerHTML = '';

            try {
                // Gọi API thông qua Proxy Nginx
                const response = await fetch('/api/danhsach-sv');
                const result = await response.json();

                if (result.status === 'success') {
                    // Lặp qua danh sách trả về từ JSON
                    result.data.forEach(sv => {
                        const row = `
                            <tr>
                                <td><b>${sv.masv}</b></td>
                                <td>${sv.name}</td>
                                <td>${sv.class}</td>
                                <td><span style="color: green; font-weight: bold;">${sv.score}</span></td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });

                    loading.style.display = 'none';
                    table.style.display = 'table';
                }
            } catch (error) {
                loading.innerText = '❌ Lỗi không thể gọi API: ' + error.message;
            }
        }