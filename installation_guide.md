# 📱 Liebherr Sensor Einstellungs-App - Offline Version

## 🚀 Vollständig offline-fähige Progressive Web App (PWA)

Diese App funktioniert **komplett ohne Internetverbindung** und kann wie eine native App installiert werden.

---

## 📋 Ordnerstruktur

```
liebherr-sensor-app/
├── index.html          # Haupt-App (offline_sensor_app)
├── manifest.json       # PWA Manifest (pwa_manifest)
├── sw.js              # Service Worker (service_worker)
├── offline.html       # Offline-Fallback (offline_page)
├── icons/             # App Icons (optional)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md          # Diese Anleitung
```

---

## 🛠️ Installation & Setup

### 1. Dateien erstellen
Kopieren Sie die folgenden Dateien in einen Ordner:

- **index.html** → Vollständige App mit eingebetteten Bibliotheken
- **manifest.json** → PWA-Konfiguration
- **sw.js** → Service Worker für Offline-Funktionalität
- **offline.html** → Fallback-Seite für Offline-Modus

### 2. Icons erstellen (optional)
Erstellen Sie App-Icons in verschiedenen Größen:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512 px
- Format: PNG mit transparentem Hintergrund
- Liebherr-gelbes Design empfohlen

### 3. Lokaler Server starten
Da PWAs HTTPS erfordern, starten Sie einen lokalen Server:

#### Python 3:
```bash
python -m http.server 8000
```

#### Python 2:
```bash
python -m SimpleHTTPServer 8000
```

#### Node.js (http-server):
```bash
npx http-server -p 8000
```

#### PHP:
```bash
php -S localhost:8000
```

### 4. App öffnen
Öffnen Sie: `http://localhost:8000`

---

## 📱 Installation als App

### Desktop (Chrome, Edge, Firefox):
1. Öffne die App im Browser
2. Klicke auf das **Installieren**-Symbol in der Adressleiste
3. Oder: **Menü** → **App installieren**
4. Die App erscheint im Startmenü/Desktop

### Mobile (Android/iOS):
1. Öffne die App im Browser
2. **Android**: "Zum Startbildschirm hinzufügen"
3. **iOS**: Teilen-Button → "Zum Home-Bildschirm"

---

## ✨ Funktionen (Vollständig Offline)

### 🔧 Kern-Funktionen:
- ✅ Sensor-Konfiguration (4 vorkonfigurierte Sensoren)
- ✅ Messwerte-Eingabe und Berechnung
- ✅ Echtzeit-Diagramme
- ✅ Excel/CSV Export
- ✅ PDF Report Generation (HTML-Format offline)
- ✅ Automatische Datenspeicherung (IndexedDB)

### 📊 Technische Features:
- ✅ **PWA** - Installierbar als native App
- ✅ **Service Worker** - Vollständige Offline-Funktionalität
- ✅ **IndexedDB** - Persistente lokale Datenspeicherung
- ✅ **Responsive Design** - Desktop und Mobile optimiert
- ✅ **Cache-First Strategie** - Maximale Performance
- ✅ **Background Sync** - Daten-Synchronisation

### 🛡️ Offline-Sicherheit:
- ✅ Alle Daten bleiben **100% lokal**
- ✅ Keine externen Abhängigkeiten
- ✅ Funktioniert ohne Internet
- ✅ Automatic Backup in IndexedDB
- ✅ Kein Datenverlust bei Browser-Neustart

---

## 🔄 Updates & Wartung

### Automatische Updates:
- Service Worker erkennt App-Updates automatisch
- Benutzer wird über verfügbare Updates informiert
- Ein-Klick Update-Installation

### Manuelle Cache-Bereinigung:
```javascript
// In Browser-Konsole ausführen:
caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
    location.reload();
});
```

---

## 🎯 Verwendung

### 1. Sensoren konfigurieren:
- Standardmäßig 4 DIST-Sensoren vorkonfiguriert
- Klick auf ✏️ zum Bearbeiten
- Automatische Speicherung aller Änderungen

### 2. Messwerte eingeben:
- Eingabe in mA oder mm möglich
- Automatische Umrechnung und Validierung
- Echtzeit-Toleranzprüfung

### 3. Reports generieren:
- **Excel/CSV**: Strukturierte Datenexport
- **PDF/HTML**: Professionelle Reports mit Liebherr-Branding
- Justieranweisungen automatisch generiert

### 4. Diagramme analysieren:
- Horizontales Balkendiagramm
- Soll-/Istwert Vergleich
- Toleranzgrenzen visualisiert

---

## 🔧 Konfiguration

### Sensor-Parameter anpassen:
```javascript
// Standard-Sensoren in index.html Zeile ~280
let sensors = [
    {
        id: 1, 
        name: 'DIST 1', 
        minSignal: 4,      // mA
        maxSignal: 20,     // mA
        minValue: 0.2,     // mm
        maxValue: 7,       // mm
        setpoint: 3,       // mm
        tolerance: 0.2     // ±mm
    }
    // ... weitere Sensoren
];
```

### PWA-Einstellungen anpassen:
Bearbeiten Sie `manifest.json` für:
- App-Name und Beschreibung
- Icons und Farben
- Shortcuts und Screenshots

---

## 🛠️ Erweiterte Features

### Background Sync:
```javascript
// Automatische Daten-Synchronisation
if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then(registration => {
        return registration.sync.register('sensor-data-sync');
    });
}
```

### Push Notifications:
```javascript
// Update-Benachrichtigungen
navigator.serviceWorker.ready.then(registration => {
    return registration.showNotification('Sensor App Update', {
        body: 'Neue Version verfügbar!',
        icon: './icons/icon-192.png'
    });
});
```

---

## 🚨 Fehlerbehebung

### Problem: App lädt nicht
**Lösung**: 
1. Cache leeren: `Strg+Shift+R`
2. Browser-Daten löschen
3. Service Worker neu registrieren

### Problem: Daten verschwunden
**Lösung**:
1. IndexedDB prüfen: F12 → Application → IndexedDB
2. Backup aus Export wiederherstellen
3. Standard-Sensoren werden automatisch geladen

### Problem: Installation nicht möglich
**Lösung**:
1. HTTPS erforderlich (auch localhost)
2. Manifest.json korrekt verlinkt
3. Service Worker registriert

---

## 📊 Browser-Kompatibilität

| Browser | PWA | Service Worker | IndexedDB | Offline |
|---------|-----|----------------|-----------|---------|
| Chrome 90+ | ✅ | ✅ | ✅ | ✅ |
| Firefox 85+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ | ✅ |

---

## 🔐 Datenschutz & Sicherheit

- **100% lokale Datenspeicherung** - Keine Cloud-Synchronisation
- **Keine Tracking-Cookies** - Vollständig privat
- **Offline-First Design** - Keine Datenübertragung
- **Open Source** - Transparenter Code
- **DSGVO-konform** - Keine personenbezogenen Daten gesammelt

---

## 📞 Support & Kontakt

Für technischen Support oder Fragen zur Liebherr Sensor App:

- **GitHub Issues**: [Repository erstellen]
- **E-Mail**: [Ihr Kontakt]
- **Dokumentation**: Diese README.md

---

## 📜 Lizenz

Diese Software ist für den internen Gebrauch bei Liebherr entwickelt.
Alle Rechte vorbehalten.

**© 2024 Liebherr - Sensor Einstellungs-App**

---

## 🎉 Los geht's!

1. **Dateien kopieren** → Alle 4 Dateien in einen Ordner
2. **Server starten** → `python -m http.server 8000`
3. **App öffnen** → `http://localhost:8000`
4. **Installieren** → Browser-Popup oder manuell
5. **Offline nutzen** → Vollständige Funktionalität ohne Internet

**Die App ist sofort einsatzbereit! 🚀**