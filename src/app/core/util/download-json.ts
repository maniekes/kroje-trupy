export const downloadJson = (data: any, filename: string = 'data.json'): void => {
  // Convert the data to a JSON string
  const jsonString = JSON.stringify(data);
  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], {type: 'application/json'});
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a temporary anchor element and trigger the download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Append the anchor to the body
  a.click(); // Programmatically click the anchor to trigger the download
  document.body.removeChild(a); // Clean up by removing the anchor from the body
  URL.revokeObjectURL(url); // Release the created URL
};
