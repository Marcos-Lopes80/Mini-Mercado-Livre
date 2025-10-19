{ pkgs, ... }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.firebase-tools
    pkgs.flutter # Add Flutter SDK
    pkgs.curl
    pkgs.google-cloud-sdk # Add Google Cloud SDK
  ];
  env = {
    GITHUB_TOKEN = "YOUR-TOKEN-HERE";
  };
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "dart-code.flutter" # Add Flutter extension
      "google.gemini-cli-vscode-ide-companion"
    ];
    previews = {
      enable = true;
      previews = {
        # Backend server preview
        web = {
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };
    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {
        dev-server = "npm run dev";
      };
    };
  };
}
