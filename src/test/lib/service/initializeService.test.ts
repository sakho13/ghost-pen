import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { InitializeService } from "../../../lib/service/initializeService";
import { ConfigRepository } from "../../../lib/repository/configRepository";

suite("InitializeService Test Suite", () => {
  let initializeService: InitializeService;
  let configRepository: ConfigRepository;
  let tempDir: string;

  setup(() => {
    configRepository = new ConfigRepository();
    initializeService = new InitializeService(configRepository);
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ghost-pen-test-"));
  });

  teardown(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("initialize - 新しいディレクトリに初期化する", () => {
    const result = initializeService.initialize(tempDir);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.isNewDirectory, true);
    assert.strictEqual(
      result.message,
      ".ghost-pen ディレクトリを初期化しました"
    );

    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    const configPath = path.join(ghostPenPath, "config.json");

    assert.strictEqual(fs.existsSync(ghostPenPath), true);
    assert.strictEqual(fs.existsSync(configPath), true);

    // 設定ファイルの内容を確認
    const configContent = JSON.parse(fs.readFileSync(configPath, "utf8"));
    assert.strictEqual(configContent.configVersion, "0.0.1");
  });

  test("initialize - 既に初期化済みのディレクトリの場合", () => {
    // 事前に初期化
    initializeService.initialize(tempDir);

    // 再度初期化を試行
    const result = initializeService.initialize(tempDir);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.isNewDirectory, false);
    assert.strictEqual(
      result.message,
      ".ghost-pen ディレクトリは既に初期化されています"
    );
  });

  test("initialize - .ghost-penディレクトリは存在するがconfig.jsonがない場合", () => {
    // .ghost-penディレクトリのみ作成
    const ghostPenPath = path.join(tempDir, ".ghost-pen");
    fs.mkdirSync(ghostPenPath);

    const result = initializeService.initialize(tempDir);

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.isNewDirectory, false);
    assert.strictEqual(
      result.message,
      ".ghost-pen ディレクトリを初期化しました"
    );

    // config.jsonが作成されていることを確認
    const configPath = path.join(ghostPenPath, "config.json");
    assert.strictEqual(fs.existsSync(configPath), true);
  });

  test.skip("initialize - 権限エラーなどでファイル作成に失敗した場合", () => {
    // 読み取り専用のディレクトリを作成してエラーを発生させる
    const readOnlyDir = path.join(tempDir, "readonly");
    fs.mkdirSync(readOnlyDir);
    fs.chmodSync(readOnlyDir, 0o444); // 読み取り専用に設定

    const result = initializeService.initialize(readOnlyDir);

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.isNewDirectory, false);
    assert.strictEqual(
      result.message.startsWith("初期化中にエラーが発生しました:"),
      true
    );

    // 権限を戻す（cleanup用）
    fs.chmodSync(readOnlyDir, 0o755);
  });
});
