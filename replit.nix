{ pkgs }: {
  deps = [       
		pkgs.yarn  
		pkgs.nodejs-18_x      
		pkgs.nodePackages.typescript-language-server
		pkgs.openssl
	];
}