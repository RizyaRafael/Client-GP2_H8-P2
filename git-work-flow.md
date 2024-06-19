# notes git work flow
1. Buat organization -> invite anggota
2. Buat repo -> client sendiri & server sendiri
3. Buat branch development
4. Ke setting -> default branch jadi development

5. clone reponya (posisi default branch sudah development)
6. Buat branch baru
  git checkout -b namaBranchBaru
7. Kerjain fiturnya. Jangan lupa add commit push kalo sudah selesai
8. Pindah ke development dengan command `git checkout development`
    - (check dulu, yang lain udah ada yang update developmentnya atau belum). Kalo belum bisa langsung jalankan `git merge --no-ff namaBranchBaru` -> habis ini muncul vim commit. Bisa ketik `:wq` terus enter
    - habis selesai merge. harus push development

9. Kalo dev sudah di update orang lain. Sebelum merge, harus pull dulu. Dengan command `git pull origin development`